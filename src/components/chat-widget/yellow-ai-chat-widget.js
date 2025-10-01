'use client';

import { useEffect } from 'react';
import { usePathname } from 'src/routes/hooks';
import './yellow-ai-styles.css';

const YellowAIChatWidget = () => {
  const pathname = usePathname();
  const isCheckout = pathname.startsWith('/checkout/checkout-form');
  const isProducts = pathname.startsWith('/products');
  const isHotels = pathname.startsWith('/hotels');
  const shouldHide = isCheckout || isProducts || isHotels;

  // Set data attribute to body IMMEDIATELY for CSS handling
  useEffect(() => {
    if (shouldHide) {
      document.body.setAttribute('data-hide-yellow-ai', 'true');
    } else {
      document.body.removeAttribute('data-hide-yellow-ai');
    }
  }, [shouldHide]);

  useEffect(() => {
    const botId = process.env.NEXT_PUBLIC_YELLOW_AI_BOT_ID || 'x1755662762547';
    const host =
      process.env.NEXT_PUBLIC_YELLOW_AI_HOST || 'https://r2.cloud.yellow.ai';
    window.ymConfig = {
      bot: botId,
      host: host,
    };

    const ensureWidgetPosition = () => {
      setTimeout(() => {
        const widget = document.querySelector('#ymDivBar');
        if (widget) {
          widget.style.bottom = '120px';
          widget.style.right = '20px';
          widget.style.zIndex = '9999';
          widget.style.position = 'fixed';
          addHintText();
        }
      }, 500);
    };

    // Function to add hint text as separate element
    const addHintText = () => {
      const existingHint = document.querySelector('.yellow-ai-hint');
      if (existingHint) {
        existingHint.remove();
      }

      const hintElement = document.createElement('div');
      hintElement.className = 'yellow-ai-hint';
      hintElement.textContent = 'Liburan? Tanya Travel AI ✨';
      document.body.appendChild(hintElement);

      // Show hint after 2 seconds
      setTimeout(() => {
        hintElement.classList.add('show');
        hintElement.classList.remove('hide');
      }, 2000);

      // Hide hint after 120 seconds
      setTimeout(() => {
        hintElement.classList.add('hide');
        hintElement.classList.remove('show');
      }, 120000);

      let hintAutoHidden = false;
      const showHint = () => {
        if (!hintAutoHidden) return;
        hintElement.classList.add('show');
        hintElement.classList.remove('hide');
      };

      const hideHint = () => {
        if (!hintAutoHidden) return;
        hintElement.classList.add('hide');
        hintElement.classList.remove('show');
      };

      setTimeout(() => {
        hintAutoHidden = true;
        const widget = document.querySelector('#ymDivBar');
        if (widget) {
          widget.addEventListener('mouseenter', showHint);
          widget.addEventListener('mouseleave', hideHint);
        }
        hintElement.addEventListener('mouseenter', showHint);
        hintElement.addEventListener('mouseleave', hideHint);
      }, 61000);
      window._yellowAIHint = hintElement;
    };

    // Function to load Yellow.ai script
    const loadYellowAIScript = () => {
      if (window.YellowMessenger) {
        if (window.YellowMessenger.reattach) {
          window.YellowMessenger.reattach();
        } else if (window.YellowMessenger.update) {
          window.YellowMessenger.update();
        }
        return;
      }
      const script = document.createElement('script');
      script.src =
        'https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Yellow.ai chat widget loaded successfully');
        ensureWidgetPosition();
      };
      script.onerror = (error) => {
        console.error('Failed to load Yellow.ai chat widget:', error);
      };

      document.head.appendChild(script);
    };
    loadYellowAIScript();

    return () => {
      if (window._yellowAIHint) {
        window._yellowAIHint.remove();
        window._yellowAIHint = null;
      }

      if (window.YellowMessenger && window.YellowMessenger.destroy) {
        window.YellowMessenger.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const updateWidgetVisibility = () => {
      const widget = document.querySelector('#ymDivBar');
      const hint = document.querySelector('.yellow-ai-hint');

      if (widget) {
        widget.style.display = shouldHide ? 'none' : 'block';
      }
      if (hint) {
        hint.style.display = shouldHide ? 'none' : 'block';
      }

      // Return true if both elements found or not needed
      return !!(widget || hint);
    };

    // Initial check
    updateWidgetVisibility();

    // Retry mechanism to handle late-loading widget
    let retryCount = 0;
    const maxRetries = 10; // Check for 5 seconds (10 x 500ms)
    const retryInterval = setInterval(() => {
      if (updateWidgetVisibility() || retryCount >= maxRetries) {
        clearInterval(retryInterval);
      }
      retryCount++;
    }, 500);

    // Cleanup interval on unmount
    return () => {
      clearInterval(retryInterval);
    };
  }, [pathname, isCheckout, isProducts, isHotels]);

  return null;
};

export default YellowAIChatWidget;
