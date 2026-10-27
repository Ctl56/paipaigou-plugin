jQuery(async () => {
    // 1. 构建弹窗
    const modalHtml = `
        <div id="paipai-modal" style="display:none; position:fixed; top:5%; left:5%; width:90%; height:90%; z-index:999999; background:#fff; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.5); flex-direction:column; overflow:hidden;">
            <div style="background:#f4eff0; padding:10px 15px; border-bottom:1px solid #d8cdd0; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:bold; color:#5a5052;">排排狗工具箱</span>
                <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:15px; padding:0;">关闭 ✖</button>
            </div>
            <iframe id="paipai-iframe" src="scripts/extensions/third-party/paipaigou-plugin/index.html" style="width:100%; height:100%; border:none; flex:1;"></iframe>
        </div>
    `;
    $('body').append(modalHtml);

    // 2. 构建屏幕右下角的悬浮狗头
    const btnHtml = `
        <div id="paipai-fixed-btn" style="position:fixed; bottom:150px; right:20px; z-index:99999; font-size:30px; background:#d8cdd0; width:55px; height:55px; border-radius:50%; display:flex; justify-content:center; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,0.4); cursor:pointer;">🐶</div>
    `;
    $('body').append(btnHtml);

    // 3. 在酒馆的扩展设置面板里加一个兜底按钮
    const extensionSettingsHtml = `
        <div class="st-extension-box">
            <div class="menu_button" onclick="$('#paipai-fixed-btn').click()">打开排排狗</div>
        </div>
    `;
    $('#extensions_settings').append(extensionSettingsHtml);

    // 4. 交互逻辑
    $('#paipai-close-btn').on('click', function() {
        $('#paipai-modal').css('display', 'none');
    });

    $('#paipai-fixed-btn').on('click', function() {
        let selectedText = window.getSelection().toString().trim();
        $('#paipai-modal').css('display', 'flex');
        
        setTimeout(() => {
            const iframe = document.getElementById('paipai-iframe');
            if (iframe && iframe.contentWindow && selectedText) {
                iframe.contentWindow.postMessage({ type: 'PaiPai_SendText', text: selectedText }, '*');
                window.getSelection().removeAllRanges();
            }
        }, 800);
    });

    // 弹出酒馆系统自带的绿条提示，证明代码执行成功
    toastr.success("排排狗已加载！");
});
