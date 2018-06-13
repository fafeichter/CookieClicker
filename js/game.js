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
    $autoClickerGrowth = $('#auto-clicker-growth');

    // click on auto clicker
    $multiplierBtn = $('#multiplier-btn');
    $multiplierCostsContainer = $('#multiplier-costs');
    $multiplierValueContainer = $('#multiplier-value');
    $multiplierGrowth = $('#multiplier-growth');

    /**
     *  VARIABLES
     */
    var cookieCounter = 0;
    var cookiesPerSecond = 0;

    // auto-clicker
    var autoClickerCosts = 10;
    var autoClickerValue = 0;
    var autoClickerGrowth = 1;
    var autoClickerInterval = null;

    // multiplier
    var multiplierCosts = 100;
    var multiplierValue = 1.0;
    var multiplierGrowth = 1.301;
    var multiplierIndex = 2.0;

    var hasAutoClicker = 0;

    const AUTO_CLICKER_COSTS_MULTIPLIER = 2;
    const MULTIPLIER_COSTS_MULTIPLIER = 4;

    $(document).ready(function () {
        // click on cookie
        $cookie.on("click", function () {
            handleCookieClick(cookieCounter);
        });

        // click on auto clicker
        $autoClickerBtn.on("click", function () {
            handleAutoClickerClick();
        });

        // click on multiplier
        $multiplierBtn.on("click", function () {
            handleMultiplierClick();
        });

    });

    function handleCookieClick() {
        cookieCounter += autoClickerValue === 0 ? 1 : autoClickerValue;
        updateCookieCounter(cookieCounter);
    }

    function handleAutoClickerClick() {
        if (!$autoClickerBtn.hasClass('disabled')) {
            hasAutoClicker = 1;
            cookieCounter -= autoClickerCosts;
            // y = 5x
            autoClickerCosts *= AUTO_CLICKER_COSTS_MULTIPLIER;
            autoClickerValue += multiplierValue;
            cookiesPerSecond += multiplierValue;

            updateCookieCounter();
            updateAutoClickerValue();
            updateAutoClickerCosts();

            if (autoClickerInterval === null) {
                autoClickerInterval = window.setInterval(timer, 1000);
            }
        }
    }

    function handleMultiplierClick() {
        if (!$multiplierBtn.hasClass('disabled')) {

            // y = log(x) mit x >= 2

            multiplierValue *= multiplierGrowth;

            autoClickerGrowth = multiplierValue;

            multiplierIndex++;
            multiplierGrowth = Math.log10(multiplierIndex) * multiplierValue + 1;
            // cookiesPerSecond = Math.round(cookiesPerSecond * multiplierValue * 100) / 100;

            cookieCounter -= multiplierCosts;

            // y = 5x
            multiplierCosts *= MULTIPLIER_COSTS_MULTIPLIER;
            updateMultiplierCosts();

            updateCookieCounter();

            $multiplierGrowth.text(Math.round(multiplierGrowth * 100) / 100);
            $multiplierValueContainer.text(Math.round(multiplierValue * 100) / 100);

            $autoClickerGrowth.text(Math.round(autoClickerGrowth * 100) / 100);

            if (hasAutoClicker === 1) {
                autoClickerValue += multiplierValue;
                cookiesPerSecond += multiplierValue;

                updateAutoClickerValue();
            }
        }
    }

    function timer() {
        cookieCounter += autoClickerValue;
        updateCookieCounter();
    }

    function updateCookieCounter() {
        $cookieCounterContainer.text(Math.round(cookieCounter));
        checkAutoClickerBtnStatus();
        checkMultiplierBtnStatus();
    }

    function updateAutoClickerValue() {
        $autoClickerValueContainer.text(Math.round(autoClickerValue * 100) / 100);
        updateCookiesPerSecond();
    }

    function updateAutoClickerCosts() {
        $autoClickerCostsContainer.text(autoClickerCosts);
    }

    function updateCookiesPerSecond() {
        $cookiesPerSecondContainer.text(Math.round(cookiesPerSecond * 100) / 100);
    }

    function isButtonEnabled(button) {
        return $(button).hasClass('disabled') === true;
    }

    function updateMultiplierCosts() {
        $multiplierCostsContainer.text(multiplierCosts);
    }


    function checkAutoClickerBtnStatus() {
        if (cookieCounter >= autoClickerCosts && isButtonEnabled($autoClickerBtn)) {
            $autoClickerBtn.removeClass('disabled');
        } else {
            if (cookieCounter < autoClickerCosts && !isButtonEnabled($autoClickerBtn)) {
                $autoClickerBtn.addClass('disabled');
            }
        }
    }

    function checkMultiplierBtnStatus() {
        if (cookieCounter >= multiplierCosts && isButtonEnabled($multiplierBtn)) {
            $multiplierBtn.removeClass('disabled');
        } else {
            if (cookieCounter < multiplierCosts && !isButtonEnabled($multiplierBtn)) {
                $multiplierBtn.addClass('disabled');
            }
        }
    }
});