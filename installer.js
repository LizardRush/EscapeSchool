const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const deleteHTMLFiles = (filePath) => {
    fs.readdirSync(filePath).forEach((file) => {
        if (file.endsWith('.html')) {
            fs.unlinkSync(path.join(filePath, file));
        }
    });
};

const deleteNonHTMLFiles = (filePath) => {
    fs.readdirSync(filePath).forEach((file) => {
        if (!file.endsWith('.html')) {
            fs.unlinkSync(path.join(filePath, file));
        }
    });
};

const deleteEmptyDirs = (filePath) => {
    fs.readdirSync(filePath).forEach((file) => {
        const fullPath = path.join(filePath, file);
        if (fs.statSync(fullPath).isDirectory() && fs.readdirSync(fullPath).length === 0) {
            fs.rmdirSync(fullPath);
        }
    });
};

const runBeforeInOrder = () => {
    fs.readdirSync('.').forEach((file) => {
        const filePath = path.join('.', file);
        if (fs.statSync(filePath).isDirectory()) {
            deleteHTMLFiles(filePath);
            execSync(`git clone https://github.com/LizardRush/EscapeSchool ${filePath}`);
            deleteNonHTMLFiles(filePath);
            deleteEmptyDirs(filePath);
            fs.readdirSync(filePath).forEach((subFile) => {
                fs.renameSync(path.join(filePath, subFile), path.join('.', subFile));
            });
            fs.rmdirSync(filePath);
        }
    });
};

// Running all functions before inorder
deleteHTMLFiles('.'); // You can change the directory path here
deleteNonHTMLFiles('.'); // You can change the directory path here
deleteEmptyDirs('.'); // You can change the directory path here