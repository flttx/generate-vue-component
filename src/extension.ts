import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.generate-vue-component', async (uri: vscode.Uri) => {
        const componentName = await vscode.window.showInputBox({ prompt: '输入组件名称' });
        
        if (componentName && uri?.fsPath) {
            const folderPath = path.join(uri.fsPath, componentName);
            createComponentFolder(folderPath, componentName);
        }
    });

    context.subscriptions.push(disposable);
}

function createComponentFolder(folderPath: string, componentName: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        createComponentFiles(folderPath, componentName);
        vscode.window.showInformationMessage(`组件 ${componentName} 创建成功！`);
    } else {
        vscode.window.showErrorMessage(`组件 ${componentName} 已存在！`);
    }
}

function createComponentVue(folderPath: string, componentName: string) {
	const componentContent = `<template>
    <div>${componentName} 组件</div>
</template>

<script>
export default {
    name: '${componentName}',
	data() {
		return {};
	},
	mounted() {},
	beforeDestroy() {},
	methods: {}
}
</script>

<style lang="scss" src="./${componentName}.scss" scoped></style>
`;
  fs.writeFileSync(path.join(folderPath, `${componentName}.vue`), componentContent);
}

function createCompontCSS(folderPath: string, componentName: string) {
	const componentContent = ``;
	fs.writeFileSync(path.join(folderPath, `${componentName}.scss`), componentContent);
}

function createComponentFiles(folderPath: string, componentName: string) {
    
	createComponentVue(folderPath, componentName);
	createCompontCSS(folderPath, componentName);
    const indexContent = `import comp from './${componentName}.vue';export default comp;`;
    fs.writeFileSync(path.join(folderPath, 'index.js'), indexContent);
}

export function deactivate() {}