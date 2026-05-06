document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();

    // ─── CONFIG ─────────────────────────────────
    const API_BASE = 'http://localhost:8000';

    // Global Language State
    let currentLang = 'en';

    // --- Translation Dictionary ---
    const translations = {
        en: {
            brandName: "Agri-Safe",
            navFeatures: "Features",
            navMarket: "Market Prices",
            navHowItWorks: "How it Works",
            navLogin: "Login",
            heroTitle1: "Smart Farming,",
            heroTitle2: "Simplified.",
            heroSub: "Scan your crops for diseases and get safe, weather-aware advice in your own language.",
            btnScan: "Scan Crop",
            btnVoice: "Voice Assistant",
            mandiTitle: "Today's Mandi Prices",
            mandiUpdate: "Updated 1 hr ago",
            cropWheat: "Wheat (Gehu)",
            cropRice: "Rice (Dhaan)",
            cropSugar: "Sugarcane",
            cropMustard: "Mustard",
            perQtl: "/ qtl",
            feat1Title: "Weather-Smart Spraying",
            feat1Desc: "If rain is coming, we'll tell you to wait before spraying pesticides, saving you money and effort.",
            feat2Title: "Local Language Chat",
            feat2Desc: "Talk to our AI assistant using voice or text in your native language for verified agricultural advice.",
            footerText: "Empowering Farmers with AI",
            modalTitle: "Welcome Back",
            modalSub: "Login with your mobile number",
            modalLabel: "Mobile Number",
            modalPlaceholder: "Enter 10 digit number",
            modalBtn: "Get OTP",
            verifyBtn: "Verify & Login",
            editNumber: "Edit mobile number",
            toastListen: "Listening... Speak now",
            chatTitle: "Ask the AI Assistant",
            chatPlaceholder: "Ask about fertilizer, yield, weather…",
            alertScanTitle: "Crop Analysis Complete",
            alertScanMsg: "Your crop image has been analysed by AI.",
            alertVoiceTitle: "Voice Captured",
            alertVoiceMsg: "Your question has been recorded. The assistant is processing your request.",
            alertInvalidNumTitle: "Invalid Number",
            alertInvalidNumMsg: "Please enter a genuine 10-digit Indian mobile number (must start with 6, 7, 8, or 9)."
        },
        hi: {
            brandName: "एग्री-सेफ",
            navFeatures: "विशेषताएं",
            navMarket: "मंडी के भाव",
            navHowItWorks: "यह कैसे काम करता है",
            navLogin: "लॉग इन",
            heroTitle1: "स्मार्ट खेती,",
            heroTitle2: "अब और भी आसान।",
            heroSub: "बीमारियों के लिए अपनी फसलों को स्कैन करें और अपनी भाषा में मौसम-आधारित सुरक्षित सलाह पाएं।",
            btnScan: "फसल स्कैन करें",
            btnVoice: "वॉयस असिस्टेंट",
            mandiTitle: "आज के मंडी भाव",
            mandiUpdate: "1 घंटे पहले अपडेट किया गया",
            cropWheat: "गेहूँ",
            cropRice: "धान",
            cropSugar: "गन्ना",
            cropMustard: "सरसों",
            perQtl: "/ क्विंटल",
            feat1Title: "मौसम-अनुकूल छिड़काव",
            feat1Desc: "अगर बारिश होने वाली है, तो हम आपको कीटनाशक छिड़कने से पहले रुकने की सलाह देंगे, जिससे आपके पैसे और मेहनत बचेगी।",
            feat2Title: "स्थानीय भाषा में चैट",
            feat2Desc: "सत्यापित कृषि सलाह के लिए अपनी मूल भाषा में वॉयस या टेक्स्ट का उपयोग करके हमारे AI सहायक से बात करें।",
            footerText: "AI के साथ किसानों को सशक्त बनाना",
            modalTitle: "वापसी पर स्वागत है",
            modalSub: "अपने मोबाइल नंबर से लॉग इन करें",
            modalLabel: "मोबाइल नंबर",
            modalPlaceholder: "10 अंकों का नंबर दर्ज करें",
            modalBtn: "OTP प्राप्त करें",
            verifyBtn: "सत्यापित करें और लॉग इन करें",
            editNumber: "मोबाइल नंबर बदलें",
            toastListen: "सुन रहा हूँ... अब बोलें",
            chatTitle: "AI सहायक से पूछें",
            chatPlaceholder: "उर्वरक, उपज, मौसम के बारे में पूछें…",
            alertScanTitle: "फसल विश्लेषण पूर्ण",
            alertScanMsg: "आपकी फसल की छवि AI द्वारा विश्लेषण की गई है।",
            alertVoiceTitle: "आवाज़ कैप्चर की गई",
            alertVoiceMsg: "आपका प्रश्न रिकॉर्ड कर लिया गया है। सहायक आपके अनुरोध पर कार्रवाई कर रहा है।",
            alertInvalidNumTitle: "अमान्य नंबर",
            alertInvalidNumMsg: "कृपया 10 अंकों का सही भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू होना चाहिए)।"
        }
    };

    // ─── CUSTOM ALERT ────────────────────────────
    const customAlert  = document.getElementById('custom-alert');
    const alertTitle   = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const alertIconCtr = document.getElementById('alert-icon-container');
    const alertIcon    = document.getElementById('alert-icon');
    const closeAlertBtn = document.getElementById('close-alert-btn');

    function showCustomAlert(title, message, type = 'success') {
        alertTitle.innerText   = title;
        alertMessage.innerText = message;
        alertIconCtr.className = 'mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4';

        if (type === 'success') {
            alertIconCtr.classList.add('bg-green-100', 'text-agriGreen');
            alertIcon.setAttribute('data-lucide', 'check-circle');
            closeAlertBtn.className = 'w-full bg-agriGreen hover:bg-agriDark text-white font-bold py-3 rounded-lg transition shadow-md';
        } else if (type === 'error') {
            alertIconCtr.classList.add('bg-red-100', 'text-red-600');
            alertIcon.setAttribute('data-lucide', 'alert-triangle');
            closeAlertBtn.className = 'w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition shadow-md';
        }
        lucide.createIcons();
        customAlert.classList.remove('hidden');
    }

    closeAlertBtn.addEventListener('click', () => customAlert.classList.add('hidden'));

    // ─── LANGUAGE ────────────────────────────────
    const langSelectors = document.querySelectorAll('.lang-selector');

    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.innerText = translations[lang][key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });
        langSelectors.forEach(s => s.value = lang);
        document.documentElement.lang = lang;
    }

    langSelectors.forEach(s => s.addEventListener('change', e => updateLanguage(e.target.value)));

    // ─── MOBILE MENU ─────────────────────────────
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu    = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));

    // ─── LOGIN MODAL ─────────────────────────────
    const loginModal      = document.getElementById('login-modal');
    const loginForm       = document.getElementById('login-form');
    const otpForm         = document.getElementById('otp-form');
    const mobileInput     = document.getElementById('mobile-input');
    const displayMobileNum = document.getElementById('display-mobile-num');
    const desktopLoginBtn = document.getElementById('login-btn-desktop');
    const mobileLoginBtn  = document.getElementById('login-btn-mobile');
    const closeModalBtn   = document.getElementById('close-modal-btn');
    const backToMobileBtn = document.getElementById('back-to-mobile-btn');
    const verifyBtn       = document.getElementById('verify-btn');

    function openModal() { loginModal.classList.remove('hidden'); resetLoginFlow(); }
    function closeModal() { loginModal.classList.add('hidden'); }

    function resetLoginFlow() {
        loginForm.classList.remove('hidden');
        otpForm.classList.add('hidden');
        mobileInput.value = '';
        document.getElementById('modal-title').innerText    = translations[currentLang].modalTitle;
        document.getElementById('modal-subtitle').innerText = translations[currentLang].modalSub;
        document.getElementById('modal-header-icon').setAttribute('data-lucide', 'smartphone');
        lucide.createIcons();
    }

    desktopLoginBtn.addEventListener('click', openModal);
    mobileLoginBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    backToMobileBtn.addEventListener('click', resetLoginFlow);
    loginModal.addEventListener('click', e => { if (e.target === loginModal) closeModal(); });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const mobileNum = mobileInput.value.trim();
        if (mobileNum === '') { switchToOtpScreen('Test Mode'); return; }
        if (!/^[6-9]\d{9}$/.test(mobileNum)) {
            showCustomAlert(translations[currentLang].alertInvalidNumTitle, translations[currentLang].alertInvalidNumMsg, 'error');
            return;
        }
        switchToOtpScreen('+91 ' + mobileNum);
    });

    function switchToOtpScreen(numberDisplay) {
        loginForm.classList.add('hidden');
        otpForm.classList.remove('hidden');
        displayMobileNum.innerText = numberDisplay;
        document.getElementById('modal-title').innerText    = currentLang === 'en' ? 'Enter OTP' : 'OTP दर्ज करें';
        document.getElementById('modal-subtitle').innerText = currentLang === 'en' ? 'Secure Verification' : 'सुरक्षित सत्यापन';
        document.getElementById('modal-header-icon').setAttribute('data-lucide', 'shield-check');
        lucide.createIcons();
    }

    verifyBtn.addEventListener('click', () => {
        closeModal();
        showCustomAlert(
            currentLang === 'en' ? 'Login Successful' : 'लॉग इन सफल',
            currentLang === 'en' ? 'Welcome back to Agri-Safe.' : 'एग्री-सेफ में आपका स्वागत है।'
        );
    });

    // ─── SCAN CROP → /api/detect/scan ────────────
    const scanCropBtn = document.getElementById('scan-crop-btn');
    const cameraInput = document.getElementById('camera-input');

    scanCropBtn.addEventListener('click', () => cameraInput.click());

    cameraInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show loading state
        scanCropBtn.disabled = true;
        scanCropBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Analysing…';
        lucide.createIcons();

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res  = await fetch(`${API_BASE}/api/detect/scan`, { method: 'POST', body: formData });
            const data = await res.json();

            showCustomAlert(
                `🌿 ${data.prediction} (${data.confidence})`,
                data.advisory
            );
        } catch (err) {
            showCustomAlert('Connection Error', 'Could not reach the server. Make sure the backend is running.', 'error');
        } finally {
            scanCropBtn.disabled = false;
            scanCropBtn.innerHTML = '<i data-lucide="camera"></i> <span data-i18n="btnScan">' + translations[currentLang].btnScan + '</span>';
            lucide.createIcons();
            cameraInput.value = '';
        }
    });

    // ─── VOICE ASSISTANT ─────────────────────────
    const voiceBtn    = document.getElementById('voice-btn');
    const voiceToast  = document.getElementById('voice-toast');
    let isListening   = false;

    voiceBtn.addEventListener('click', () => {
        if (isListening) return;
        isListening = true;
        voiceToast.classList.remove('hidden');

        setTimeout(async () => {
            voiceToast.classList.add('hidden');
            isListening = false;

            // Send a mock voice query to the chat API
            const mockQuestion = 'yield';
            try {
                const res  = await fetch(`${API_BASE}/api/chat/ask`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: mockQuestion })
                });
                const data = await res.json();
                showCustomAlert(translations[currentLang].alertVoiceTitle, data.reply);
            } catch {
                showCustomAlert(translations[currentLang].alertVoiceTitle, translations[currentLang].alertVoiceMsg);
            }
        }, 3000);
    });

    // ─── CHAT → /api/chat/ask ────────────────────
    const chatInput   = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    function appendChatMessage(text, role) {
        const isUser = role === 'user';
        const wrapper = document.createElement('div');
        wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;

        const bubble = document.createElement('div');
        bubble.className = isUser
            ? 'bg-agriGreen text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-xs'
            : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-xs shadow-sm';
        bubble.innerText = text;
        wrapper.appendChild(bubble);
        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendChatMessage() {
        const question = chatInput.value.trim();
        if (!question) return;

        appendChatMessage(question, 'user');
        chatInput.value = '';
        chatSendBtn.disabled = true;

        try {
            const res  = await fetch(`${API_BASE}/api/chat/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
            const data = await res.json();
            appendChatMessage(data.reply, 'bot');
        } catch {
            appendChatMessage('⚠️ Could not reach server. Is the backend running?', 'bot');
        } finally {
            chatSendBtn.disabled = false;
        }
    }

    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });

    // ─── WEATHER → /api/weather/current ──────────
    async function loadWeather() {
        try {
            const res  = await fetch(`${API_BASE}/api/weather/current`);
            const data = await res.json();

            const widget  = document.getElementById('weather-widget');
            const summary = document.getElementById('weather-summary');
            const icon    = document.getElementById('weather-icon');

            summary.innerText = `${data.condition} · ${data.temperature} · Humidity ${data.humidity} — ${data.rain_forecast}`;
            icon.setAttribute('data-lucide', data.icon || 'cloud-sun');
            lucide.createIcons();
            widget.classList.remove('hidden');
        } catch {
            // Silently skip if backend is offline
        }
    }

    loadWeather();

    // Seed a welcome message in chat
    appendChatMessage('👋 Hello! Ask me about fertilizer, yield, or weather-safe spraying.', 'bot');
});
        
