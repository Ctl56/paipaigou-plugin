// 插件所在的文件夹路径
const extensionFolderPath = 'scripts/extensions/third-party/paipaigou-plugin';

jQuery(async () => {
    // 1. 在酒馆的扩展设置面板里，加一个大按钮
    const uiHtml = `
        <div class="st-extension-box">
            <h3>排排狗工具箱</h3>
            <div class="menu_button" id="paipai-open-btn">打开排排狗 (自动导入刚才选中的文字)</div>
        </div>
    `;
    $('#extensions_settings').append(uiHtml);

    // 2. 监听划线选中动作
    let lastSelectedText = "";
    $(document).on('mouseup', '.mes_text', function() {
        let text = window.getSelection().toString().trim();
        if (text.length > 0) {
            lastSelectedText = text;
            toastr.success('已抓取，去右侧扩展面板打开排排狗即可应用');
        }
    });

    // 3. 构建一个纯净的悬浮大弹窗，里面装载你的 index.html
    $('body').append(`
        <div id="paipai-modal" style="display:none; position:fixed; top:5%; left:10%; width:80%; height:90%; z-index:999999; background:#fff; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.5); overflow:hidden;">
            <div style="background:#f4eff0; padding:10px 15px; text-align:right; border-bottom:1px solid #d8cdd0;">
                <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:14px;">关闭 ✖</button>
            </div>
            <iframe id="paipai-iframe" src="${extensionFolderPath}/index.html" style="width:100%; height:calc(100% - 40px); border:none;"></iframe>
        </div>
    `);

    // 4. 点击按钮：打开弹窗并把选中的文字传给 iframe
    $('#paipai-open-btn').on('click', () => {
        $('#paipai-modal').fadeIn(200);
        
        // 延迟 0.8 秒等网页加载完毕后，发送文字
        setTimeout(() => {
            const iframe = document.getElementById('paipai-iframe');
            if (iframe && iframe.contentWindow && lastSelectedText) {
                iframe.contentWindow.postMessage({ 
                    type: 'PaiPai_SendText', 
                    text: lastSelectedText 
                }, '*');
                lastSelectedText = ""; // 传完后清空记录
            }
        }, 800);
    });

    // 5. 点击关闭：隐藏弹窗
    $('#paipai-close-btn').on('click', () => {
        $('#paipai-modal').fadeOut(200);
    });
});