#!/usr/bin/env node

/**
 * Build script to transform example projects into markdown documentation
 * This generates a ZIP file containing one markdown file per framework example
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// File patterns to skip during transformation
const DEFAULT_SKIP_PATTERNS = [
    '.json',
    '.yaml',
    '.yml',
    '.tsbuildinfo',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.ico',
    '.svg',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.pdf',
    '.zip',
    '.tar',
    '.gz',
    '.exe',
    '.dll',
    '.so',
    '.dylib',
    '.DS_Store',
    'node_modules/',
    '.git/',
    '.gitignore',
    '.next/',
    '.css',
    '.scss',
    '.sass',
    '.less',
    '.styl',
    '.stylus',
    '.pcss',
    '.postcss',
    '.tailwindcss',
    'eslint',
    'playwright-report/',
    'test-results/',
    'coverage/',
];

/**
 * Framework mappings - maps directory names to framework identifiers
 */
const FRAMEWORK_MAPPINGS = {
    'next-app-router': {
        id: 'nextjs-app-router',
        displayName: 'Next.js App Router',
    },
    'next-pages-router': {
        id: 'nextjs-pages-router',
        displayName: 'Next.js Pages Router',
    },
};

/**
 * Build markdown header for an example project
 */
function buildMarkdownHeader(frameworkName, repoUrl, subfolderPath) {
    let markdown = `# PostHog ${frameworkName} Example Project\n\n`;
    markdown += `Repository: ${repoUrl}\n`;
    if (subfolderPath) {
        markdown += `Path: ${subfolderPath}\n`;
    }
    markdown += '\n---\n\n';
    return markdown;
}

/**
 * Convert a file to a markdown code block
 */
function fileToMarkdown(relativePath, content, extension) {
    let markdown = `## ${relativePath}\n\n`;
    markdown += `\`\`\`${extension}\n`;
    markdown += content;
    markdown += '\n```\n\n';
    return markdown;
}

/**
 * Check if a file should be skipped based on patterns
 */
function shouldSkip(filePath, skipPatterns) {
    return skipPatterns.some(pattern => filePath.includes(pattern));
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = [], baseDir = dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const relativePath = path.relative(baseDir, filePath);

        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles, baseDir);
        } else {
            arrayOfFiles.push({
                fullPath: filePath,
                relativePath: relativePath,
            });
        }
    });

    return arrayOfFiles;
}

/**
 * Convert an example project directory to markdown
 */
function convertProjectToMarkdown(projectPath, frameworkInfo, subfolderPath) {
    const repoUrl = 'https://github.com/PostHog/examples';
    let markdown = buildMarkdownHeader(frameworkInfo.displayName, repoUrl, subfolderPath);

    const files = getAllFiles(projectPath);

    // Sort files for consistent output
    files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

    for (const file of files) {
        if (shouldSkip(file.relativePath, DEFAULT_SKIP_PATTERNS)) {
            continue;
        }

        try {
            const content = fs.readFileSync(file.fullPath, 'utf8');
            const extension = path.extname(file.fullPath).slice(1) || '';
            markdown += fileToMarkdown(file.relativePath, content, extension);
        } catch (e) {
            // Skip files that can't be read as text
            console.warn(`Skipping ${file.relativePath}: ${e.message}`);
        }
    }

    return markdown;
}

/**
 * Main build function
 */
async function build() {
    console.log('Building markdown documentation from example projects...\n');

    const basicsDir = path.join(__dirname, '..', 'basics');
    const outputDir = path.join(__dirname, '..', 'dist');

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process each framework example
    const markdownFiles = [];

    for (const [dirName, frameworkInfo] of Object.entries(FRAMEWORK_MAPPINGS)) {
        const projectPath = path.join(basicsDir, dirName);

        if (!fs.existsSync(projectPath)) {
            console.warn(`Warning: Project directory not found: ${projectPath}`);
            continue;
        }

        console.log(`Processing ${frameworkInfo.displayName}...`);
        const markdown = convertProjectToMarkdown(
            projectPath,
            frameworkInfo,
            `basics/${dirName}`
        );

        const outputFilename = `${frameworkInfo.id}.md`;
        const outputPath = path.join(outputDir, outputFilename);

        fs.writeFileSync(outputPath, markdown, 'utf8');
        markdownFiles.push({ filename: outputFilename, path: outputPath });

        console.log(`  ✓ Generated ${outputFilename} (${(markdown.length / 1024).toFixed(1)} KB)`);
    }

    // Create ZIP archive
    console.log('\nCreating ZIP archive...');
    const zipPath = path.join(outputDir, 'examples-markdown.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`\n✓ Build complete!`);
        console.log(`  Archive: ${zipPath}`);
        console.log(`  Size: ${(archive.pointer() / 1024).toFixed(1)} KB`);
        console.log(`  Files: ${markdownFiles.length}`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // Add markdown files to archive
    for (const file of markdownFiles) {
        archive.file(file.path, { name: file.filename });
    }

    await archive.finalize();
}

// Run the build
build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});
