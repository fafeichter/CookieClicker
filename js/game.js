// initialize jQuery with '$'
jQuery(function ($) {

    /**
     *  jQuery objects for access to the view
     */

    // image of cookie
    $cookieImage = $('#cookie');

    // number of cookies per second
    $cookiesPerSecondContainer = $('#cookies-per-second');

    // total amount of cookies
    $numberOfCookiesContainer = $('#cookie-counter');

    // auto-clicker
    $autoClickerButton = $('#auto-clicker-btn');
    $autoClickerCostsContainer = $('#auto-clicker-costs');
    $autoClickerGrowthContainer = $('#auto-clicker-growth');
    $autoClickerValueContainer = $('#auto-clicker-value');


    // multiplier
    $multiplierButton = $('#multiplier-btn');
    $multiplierCostsContainer = $('#multiplier-costs');
    $multiplierGrowthContainer = $('#multiplier-growth');
    $multiplierValueContainer = $('#multiplier-value');


    /**
     *  variables
     */

    // game
    var cookieCounter = 0;
    var cookiesPerSecond = 0;

    // auto-clicker
    var autoClickerCosts = 10;
    var autoClickerValue = 0;
    var autoClickerGrowth = 1;
    var autoClickerInterval = null;
    var hasAutoClicker = 0;

    // multiplier
    var multiplierCosts = 100;
    var multiplierValue = 1.0;
    var multiplierGrowth = Math.log10(2) + 1;
    var multiplierIndex = 2.0;


    /**
     *  constants
     */

    const AUTO_CLICKER_COSTS_MULTIPLIER = 2;
    const MULTIPLIER_COSTS_MULTIPLIER = 4;

    $(document).ready(function () {

        // click on cookie
        $cookieImage.on("click", function () {
            handleCookieClick(cookieCounter);
        });

        // click on auto clicker
        $autoClickerButton.on("click", function () {
            handleAutoClickerClick();
        });

        // click on multiplier
        $multiplierButton.on("click", function () {
            handleMultiplierClick();
        });

    });

    function handleCookieClick() {
        cookieCounter += autoClickerValue === 0 ? 1 : autoClickerValue;

        updateCookieCounter(cookieCounter);
    }

    function handleAutoClickerClick() {
        if (!$autoClickerButton.hasClass('disabled')) {

            hasAutoClicker = 1;
            cookieCounter -= autoClickerCosts;
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
        if (!$multiplierButton.hasClass('disabled')) {

            cookieCounter -= multiplierCosts;
            multiplierCosts *= MULTIPLIER_COSTS_MULTIPLIER;
            multiplierValue *= multiplierGrowth;
            autoClickerGrowth = multiplierValue;
            multiplierIndex++;
            multiplierGrowth = Math.log10(multiplierIndex) * multiplierValue + 1;

            updateMultiplierCosts();
            updateCookieCounter();
            updateMultiplierGrowth();
            updateMultiplierValue();

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
        $numberOfCookiesContainer.text(Math.round(cookieCounter));

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

    function updateMultiplierValue() {
        $multiplierValueContainer.text(Math.round(multiplierValue * 100) / 100);
        $autoClickerGrowthContainer.text(Math.round(autoClickerGrowth * 100) / 100);
    }

    function updateMultiplierGrowth() {
        $multiplierGrowthContainer.text(Math.round(multiplierGrowth * 100) / 100);
    }


    function checkAutoClickerBtnStatus() {
        if (cookieCounter >= autoClickerCosts && isButtonEnabled($autoClickerButton)) {
            $autoClickerButton.removeClass('disabled');
        } else {
            if (cookieCounter < autoClickerCosts && !isButtonEnabled($autoClickerButton)) {
                $autoClickerButton.addClass('disabled');
            }
        }
    }

    function checkMultiplierBtnStatus() {
        if (cookieCounter >= multiplierCosts && isButtonEnabled($multiplierButton)) {
            $multiplierButton.removeClass('disabled');
        } else {
            if (cookieCounter < multiplierCosts && !isButtonEnabled($multiplierButton)) {
                $multiplierButton.addClass('disabled');
            }
        }
    }
});