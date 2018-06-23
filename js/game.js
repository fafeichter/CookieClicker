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


    // rare click
    $rareClickButton = $('#rare-click-btn');
    $rareClickCosts = $('#rare-click-costs');
    $rareClickGrowth = $('#rare-click-growth');
    $rareClickValue = $('#rare-click-value');

    // legendary click
    $legendaryClickButton = $('#legendary-click-btn');
    $legendaryClickCosts = $('#legendary-click-costs');
    $legendaryClickGrowth = $('#legendary-click-growth');
    $legendaryClickValue = $('#legendary-click-value');


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

    // rare click
    var rareClickCosts = 500;
    var rareClickValue = 0.1;
    var rareClickGrowth = 0.05;

    var legendaryClickCosts = 1500;
    var legendaryClickValue = 0.04;
    var legendaryClickGrowth = 0.02;



    /**
     *  constants
     */
    const AUTO_CLICKER_COSTS_MULTIPLIER = 2;

    const MULTIPLIER_COSTS_MULTIPLIER = 4;

    const PERCENT_MAX_VAL = 1;


    $(document).ready(function () {
      setupClickEvents();
    });

    function setupClickEvents() {
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

      // rare click button click
      $rareClickButton.on("click", function() {
        handleRareClickClick($( this ));
      });

      // legendary click button click
      $legendaryClickButton.on("click", function() {
        handleLegendaryClickClick($( this ));
      });
    }


    function handleCookieClick() {
        var gain = multiplierValue;

        // rare click increases by 40%
        if(Math.random() <= rareClickValue) {
            gain *= 1.4;
        }
        // legendary click doubles
        if(Math.random() <= legendaryClickValue) {
            gain *= 2;
        }

        cookieCounter += gain;

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

    function handleRareClickClick($el) {
        if(!$el.hasClass("disabled") && rareClickValue < PERCENT_MAX_VAL) {
          cookieCounter -= rareClickCosts;
          rareClickCosts *= 2;
          rareClickValue += rareClickGrowth;
          updateRareClick();
        }
    }

    function handleLegendaryClickClick($el) {
      if(!$el.hasClass('disabled') && legendaryClickValue < PERCENT_MAX_VAL) {
        cookieCounter -= legendaryClickCosts;
        legendaryClickCosts *= 3;
        legendaryClickValue += legendaryClickGrowth;
        updateLegendaryClick();
      }
    }


    function timer() {
        cookieCounter += autoClickerValue;

        updateCookieCounter();
    }

    function updateCookieCounter() {
        $numberOfCookiesContainer.text(Math.round(cookieCounter));
        checkButtonStatus();
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

    function updateRareClick() {
      $rareClickCosts.text(rareClickCosts);
      $rareClickValue.text(Math.round(rareClickValue * 100));
      checkRareClickBtnStatus();
    }

    function updateLegendaryClick() {
      $legendaryClickCosts.text(legendaryClickCosts);
      $legendaryClickValue.text(Math.round(legendaryClickValue * 100));
      checkLegendaryClickBtnStatus();
    }

    function checkLegendaryClickBtnStatus() {
            if ((cookieCounter >= legendaryClickCosts && PERCENT_MAX_VAL > legendaryClickValue)  && isButtonEnabled($legendaryClickButton)) {
                $legendaryClickButton.removeClass('disabled');
            } else {
                if ((cookieCounter < legendaryClickCosts || legendaryClickValue >= PERCENT_MAX_VAL) && !isButtonEnabled($legendaryClickButton)) {
                    $legendaryClickButton.addClass('disabled');
                }
            }
    }

    function checkRareClickBtnStatus() {
            if ((cookieCounter >= rareClickCosts && PERCENT_MAX_VAL > rareClickValue) && isButtonEnabled($rareClickButton)) {
                $rareClickButton.removeClass('disabled');
            } else {
                if ((cookieCounter < rareClickCosts || rareClickValue >= PERCENT_MAX_VAL) && !isButtonEnabled($rareClickButton)) {
                    $rareClickButton.addClass('disabled');
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

    function checkButtonStatus() {
      checkAutoClickerBtnStatus();
      checkMultiplierBtnStatus();
      checkRareClickBtnStatus();
      checkLegendaryClickBtnStatus();
    }
});
