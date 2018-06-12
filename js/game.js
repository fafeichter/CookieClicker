// initialize jQuery with '$'
jQuery(function ($) {

    /**
     *  VIEW
     */
    // image of cookie
    $cookie = $('#cookie');

    // number of cookies per second
    $cookiesPerSecondContainer = $('#cookies-per-second');

    // total amount of cookies
    $cookieCounterContainer = $('#cookie-counter');

    // auto-clicker
    $autoClickerBtn = $('#auto-clicker-btn');
    $autoClickerCostsContainer = $('#auto-clicker-costs');
    $autoClickerValueContainer = $('#auto-clicker-value');

    /**
     *  VARIABLES
     */
    var cookieCounter = 0;
    var cookiesPerSecond = 0;

    // auto-clicker
    var autoClickerCosts = 10;
    var autoClickerValue = 0;
    var autoClickerInterval = null;

    const AUTO_CLICKER_COSTS_MULTIPLIER = 5;

    $(document).ready(function () {
        // click on cookie
        $cookie.on("click", function () {
            handleCookieClick(cookieCounter);
        });

        // click on auto clicker
        $autoClickerBtn.on("click", function () {
            handleAutoClickerClick();
        });

    });

    function handleCookieClick() {
        cookieCounter++;
        updateCookieCounter(cookieCounter);
    }

    function handleAutoClickerClick() {
        if (!$autoClickerBtn.hasClass('disabled')) {
            cookieCounter -= autoClickerCosts;
            // y = 5x;
            autoClickerCosts *= AUTO_CLICKER_COSTS_MULTIPLIER;
            autoClickerValue++;
            cookiesPerSecond++;

            updateCookieCounter();
            updateAutoClickerValue();
            updateAutoClickerCosts();

            if (autoClickerInterval === null) {
                autoClickerInterval = window.setInterval(timer, 1000);
            }
        }
    }

    function timer() {
        cookieCounter += autoClickerValue;
        updateCookieCounter();
    }

    function updateCookieCounter() {
        $cookieCounterContainer.text(cookieCounter);

        if (cookieCounter >= autoClickerCosts && isButtonEnabled($autoClickerBtn)) {
            $autoClickerBtn.removeClass('disabled');
        } else {
            if (cookieCounter < autoClickerCosts && !isButtonEnabled($autoClickerBtn)) {
                $autoClickerBtn.addClass('disabled');
            }
        }
    }

    function updateAutoClickerValue() {
        $autoClickerValueContainer.text(autoClickerValue);
        updateCookiesPerSecond();
    }

    function updateAutoClickerCosts() {
        $autoClickerCostsContainer.text(autoClickerCosts);
    }

    function updateCookiesPerSecond() {
        $cookiesPerSecondContainer.text(cookiesPerSecond)
    }

    function isButtonEnabled(button) {
        return $(button).hasClass('disabled') === true;
    }
});