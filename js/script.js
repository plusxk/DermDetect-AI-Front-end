// script.js
document.getElementById('upload-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    var fileInput = document.getElementById('formFile');
    var file = fileInput.files[0];

    if (!file) {
        alert('請選擇一張圖片');
        return;
    }

    var formData = new FormData();
    formData.append('image', file);

    try {
        // 發送圖片到後端 API，並使用 await 等待結果
        let response = await fetch('http://localhost:5050/upload/', {
            method: 'POST',
            body: formData
        });

        // 檢查 HTTP 狀態碼
        if (!response.ok) {
            // 獲取錯誤信息
            let err = await response.json();
            throw new Error(err.error || '上傳失敗');
        }

        // 解析 JSON 響應
        let data = await response.json();

        // 顯示結果
        if (data.error) {
            document.getElementById('response').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${data.error}
                </div>
            `;
        } else {
            document.getElementById('response').innerHTML = `
                <div class="alert alert-success" role="alert">
                    predicted_class: 
                    ${data.result.predicted_class}
                </div>
                <div class="alert alert-success" role="alert">
                    confidence: 
                    ${data.result.confidence}
                </div>
            `;
        }
    } catch (error) {
        console.error('上傳失敗', error);
        document.getElementById('response').innerHTML = `
            <div class="alert alert-danger" role="alert">
                上傳失敗：${error.message || '未知錯誤'}
            </div>
        `;
    }
});
