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
    var autoClickerCosts = 10;
    var autoClickerValue = 0;

    var autoClickerInterval = null;

    const AUTO_CLICKER_COSTS_MULTIPLIER = 5;

    $(document).ready(function () {

        // click on cookie
        $cookie.on("click", function () {
            cookieCounter++;
            updateCookieCounter(cookieCounter);
        });

        // click on auto clicker
        $autoClickerBtn.on("click", function () {

                if (!$autoClickerBtn.hasClass('disabled')) {

                    cookieCounter -= autoClickerCosts;
                    autoClickerCosts *= AUTO_CLICKER_COSTS_MULTIPLIER;
                    autoClickerValue++;

                    updateCookieCounter();
                    updateAutoClickerCurrent();
                    updateAutoClickerCosts();

                    if (autoClickerInterval === null) {
                        autoClickerInterval = window.setInterval(timer, 1000);
                    }
                }
            }
        );
    });

    function timer() {
        cookieCounter += autoClickerValue;
        updateCookieCounter();
    }

    function updateCookieCounter() {
        $cookieCounterContainer.text(cookieCounter);

        if (cookieCounter >= autoClickerCosts && $autoClickerBtn.hasClass('disabled')) {
            $autoClickerBtn.removeClass('disabled');
        } else {
            if (cookieCounter < autoClickerCosts) {
                $autoClickerBtn.addClass('disabled');
            }
        }
    }

    function updateAutoClickerCurrent() {
        $autoClickerValueContainer.text(autoClickerValue);
    }

    function updateAutoClickerCosts() {
        $autoClickerCostsContainer.text(autoClickerCosts);
    }
});

