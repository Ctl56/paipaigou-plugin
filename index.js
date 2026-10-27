const extensionFolderPath = 'scripts/extensions/third-party/paipaigou-plugin';

jQuery(async () => {
    // 1. 注入排排狗弹窗
    if ($('#paipai-modal').length === 0) {
        $('body').append(`
            <div id="paipai-modal" style="display:none; position:fixed; top:5%; left:5%; width:90%; height:90%; z-index:999999; background:#fff; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.5); overflow:hidden;">
                <div style="background:#f4eff0; padding:10px 15px; border-bottom:1px solid #d8cdd0; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:bold; color:#5a5052;">排排狗工具箱</span>
                    <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:15px; padding:5px 10px;">关闭 ✖</button>
                </div>
                <iframe id="paipai-iframe" src="${extensionFolderPath}/index.html" style="width:100%; height:calc(100% - 40px); border:none;"></iframe>
            </div>
        `);
    }

    // 2. 注入一个【永远可见】的狗头悬浮按钮（半透明，防止挡视线）
    if ($('#paipai-fixed-btn').length === 0) {
        $('body').append(`
            <button id="paipai-fixed-btn" style="position:fixed; bottom:130px; right:15px; z-index:99999; background:#d8cdd0; border:none; width:50px; height:50px; border-radius:50%; font-size:24px; box-shadow:0 4px 12px rgba(0,0,0,0.3); opacity:0.8; display:flex; justify-content:center; align-items:center; cursor:pointer;">
                🐶
            </button>
        `);
    }

    // 3. 点击狗头的逻辑：抓取当前屏幕上正在被选中的文字
    $('#paipai-fixed-btn').on('click', () => {
        // 主动去抓取系统当前选中的字
        let selectedText = window.getSelection().toString().trim();
        
        // 显示排排狗
        $('#paipai-modal').fadeIn(200);
        
        // 等待排排狗界面加载，然后把字传进去
        setTimeout(() => {
            const iframe = document.getElementById('paipai-iframe');
            if (iframe && iframe.contentWindow && selectedText) {
                iframe.contentWindow.postMessage({ 
                    type: 'PaiPai_SendText', 
                    text: selectedText 
                }, '*');
                
                // 传完后，取消手机屏幕上的文字蓝底高亮状态
                window.getSelection().removeAllRanges();
            }
        }, 800);
    });
    
    // 关闭按钮逻辑
    $('#paipai-close-btn').on('click', () => {
        $('#paipai-modal').fadeOut(200);
    });
});
