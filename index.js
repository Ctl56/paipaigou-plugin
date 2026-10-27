const extensionFolderPath = 'scripts/extensions/third-party/paipaigou-plugin';

jQuery(async () => {
    // 1. 在面板留个底，以防万一
    const uiHtml = `
        <div class="st-extension-box">
            <h3>排排狗</h3>
            <div class="menu_button" id="paipai-open-btn">打开排排狗</div>
        </div>
    `;
    $('#extensions_settings').append(uiHtml);

    // 2. 注入排排狗弹窗 (全屏遮罩)
    $('body').append(`
        <div id="paipai-modal" style="display:none; position:fixed; top:5%; left:5%; width:90%; height:90%; z-index:999999; background:#fff; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.5); overflow:hidden;">
            <div style="background:#f4eff0; padding:10px 15px; text-align:right; border-bottom:1px solid #d8cdd0;">
                <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:14px;">关闭 ✖</button>
            </div>
            <iframe id="paipai-iframe" src="${extensionFolderPath}/index.html" style="width:100%; height:calc(100% - 40px); border:none;"></iframe>
        </div>
    `);

    // 3. 注入手机端专属悬浮按钮 (默认隐藏)
    $('body').append(`
        <button id="paipai-float-btn" style="display:none; position:fixed; bottom:80px; right:20px; z-index:99999; background:#d8cdd0; color:#333; border:none; padding:12px 18px; border-radius:30px; font-weight:bold; font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.3);">
            🐶 发送到排排狗
        </button>
    `);

    let lastSelectedText = "";

    // 4. 监听手机长按选中文字
    document.addEventListener('selectionchange', () => {
        let text = window.getSelection().toString().trim();
        if (text.length > 0) {
            lastSelectedText = text;
            $('#paipai-float-btn').fadeIn(200); // 选中了，弹出悬浮按钮
        } else {
            $('#paipai-float-btn').fadeOut(200); // 取消选中，隐藏按钮
        }
    });

    // 5. 打开排排狗的动作
    const openPaipai = () => {
        $('#paipai-modal').fadeIn(200);
        $('#paipai-float-btn').fadeOut(200); // 打开弹窗后，隐藏外面的悬浮按钮
        
        setTimeout(() => {
            const iframe = document.getElementById('paipai-iframe');
            if (iframe && iframe.contentWindow && lastSelectedText) {
                // 发送文字
                iframe.contentWindow.postMessage({ 
                    type: 'PaiPai_SendText', 
                    text: lastSelectedText 
                }, '*');
                
                // 取消屏幕上的高亮选中状态
                window.getSelection().removeAllRanges();
                lastSelectedText = ""; 
            }
        }, 800);
    };

    // 绑定点击事件
    $('#paipai-open-btn').on('click', openPaipai);
    $('#paipai-float-btn').on('click', openPaipai);

    $('#paipai-close-btn').on('click', () => {
        $('#paipai-modal').fadeOut(200);
    });
});
