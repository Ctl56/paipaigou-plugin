// 这是酒馆官方要求的唯一开机标准口令
export async function init() {
    console.log("【排排狗】强制唤醒协议已启动...");

    try {
        // 1. 强行在屏幕右下角注入悬浮狗头 (最高图层)
        if (!document.getElementById('paipai-fixed-btn')) {
            const btnHtml = `
                <button id="paipai-fixed-btn" style="position:fixed; bottom:150px; right:15px; z-index:2147483647; background:#d8cdd0; border:2px solid #fff; width:55px; height:55px; border-radius:50%; font-size:28px; box-shadow:0 4px 15px rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; cursor:pointer; opacity:0.9;">
                    🐶
                </button>
            `;
            document.body.insertAdjacentHTML('beforeend', btnHtml);
        }

        // 2. 强行注入排排狗弹窗
        if (!document.getElementById('paipai-modal')) {
            const modalHtml = `
                <div id="paipai-modal" style="display:none; position:fixed; top:2%; left:2%; width:96%; height:96%; z-index:2147483647; background:#fff; border-radius:12px; box-shadow:0 0 25px rgba(0,0,0,0.6); flex-direction:column; overflow:hidden;">
                    <div style="background:#f4eff0; padding:12px 15px; border-bottom:1px solid #d8cdd0; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight:bold; color:#5a5052; font-size:16px;">排排狗工具箱</span>
                        <button id="paipai-close-btn" style="color:#e11d48; font-weight:bold; cursor:pointer; background:none; border:none; font-size:16px; padding:5px 15px;">关闭 ✖</button>
                    </div>
                    <iframe id="paipai-iframe" src="scripts/extensions/third-party/paipaigou-plugin/index.html" style="width:100%; flex:1; border:none;"></iframe>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        // 3. 给狗头绑定动作
        const floatBtn = document.getElementById('paipai-fixed-btn');
        const modal = document.getElementById('paipai-modal');
        
        floatBtn.addEventListener('click', () => {
            // 抓取被选中的文字
            let selectedText = window.getSelection().toString().trim();
            // 弹出窗口
            modal.style.display = 'flex';
            
            // 延迟1秒，确保 iframe 里的排排狗加载完毕，再把字喂给它
            setTimeout(() => {
                const iframe = document.getElementById('paipai-iframe');
                if (iframe && iframe.contentWindow && selectedText) {
                    iframe.contentWindow.postMessage({ type: 'PaiPai_SendText', text: selectedText }, '*');
                    window.getSelection().removeAllRanges(); // 顺手取消手机上的蓝底高亮
                }
            }, 1000);
        });

        // 4. 关闭按钮动作
        document.getElementById('paipai-close-btn').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // 5. 【双重保险】在酒馆顶部的拼图菜单里也强行插一个按钮
        const extensionSettings = document.getElementById('extensions_settings');
        if (extensionSettings) {
            const backupBtn = `
                <div class="st-extension-box">
                    <div class="menu_button" onclick="document.getElementById('paipai-fixed-btn').click()">🐶 打开排排狗</div>
                </div>
            `;
            extensionSettings.insertAdjacentHTML('beforeend', backupBtn);
        }

        console.log("【排排狗】防弹版注入成功！");
    } catch (e) {
        console.error("【排排狗】注入报错了，赶紧看这里：", e);
    }
}
