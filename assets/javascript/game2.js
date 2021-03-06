$(document).ready(function () {

    var hero = "";
    var villain = "";
    var getID = "";
    var defeated = [];
    console.log("value of villain" + villain)

    ripleyStats = {
        name: "Ripley",
        hP: 180,
        attack: 20,
        increase: 20,
        counterAttack: 40,
    }
    vasquesStats = {
        name: "Vasquez",
        hP: 220,
        attack: 18,
        increase: 18,
        counterAttack: 25,
    }
    hicksStats = {
        name: "Hicks",
        hP: 250,
        attack: 18,
        increase: 18,
        counterAttack: 15,
    }

    alienStats = {
        name: "Xenomorph",
        hP: 240,
        attack: 20,
        increase: 20,
        counterAttack: 20,
    }

    //this took me two days to figure out!!//
    //send characters to opponent and defender div.

    $("#characters div").on("click", function () {
        $("#yourCharacter").append(this);
        $("#enemies").append($("#characters div").not(this));
        $("#enemies div").css({
            background: "red"
        });
        assignHero();
        $("#enemies div").off("click");

    });
    //thanks to Zach for helping me un-nest this from the above function!//
    $("#enemies").on("click", "div", function () {
        if ($("#currentOpponent").is(":empty")) {
            $("#currentOpponent").append($(this));
            assignVillain();
        } else {
            $("#enemies").append(this);
        }

    });


    ///asign hero
    function assignHero() {
        var getMe = $("#yourCharacter div");
        //    console.log(getMe);
        getID = getMe.attr("id");
        //    console.log(getID); 
        if (getID === "ripley") {
            hero = ripleyStats;
            // console.log(hero);
        } else if (getID === "vasquez") {
            hero = vasquesStats;
            // console.log(hero);
        } else if (getID === "hicks") {
            hero = hicksStats;
            // console.log(hero);
        } else if (getID === "alien") {
            hero = alienStats;
            // console.log(hero);
        }
    }

    //assign villain
    function assignVillain() {
        var getVillain = $("#currentOpponent div");
        getVillainID = getVillain.attr("id");
        if (getVillainID === "ripley") {
            villain = ripleyStats;
        } else if (getVillainID === "vasquez") {
            villain = vasquesStats;
        } else if (getVillainID === "hicks") {
            villain = hicksStats;
        } else if (getVillainID === "alien") {
            villain = alienStats;
        }
    }

    //asign healthpoints and attack points//
    function assignStats() {
        $("#hPRipley").text(ripleyStats.hP);
        $("#attackRipley").text(ripleyStats.attack);
        $("#counterRipley").text(ripleyStats.counterAttack);

        $("#hPVasquez").text(vasquesStats.hP);
        $("#attackVasquez").text(vasquesStats.attack);
        $("#counterVasquez").text(vasquesStats.counterAttack);

        $("#hPHicks").text(hicksStats.hP);
        $("#attackHicks").text(hicksStats.attack);
        $("#counterHicks").text(hicksStats.counterAttack);

        $("#hPAlien").text(alienStats.hP);
        $("#attackAlien").text(alienStats.attack);
        $("#counterAlien").text(alienStats.counterAttack);


    }
    assignStats();

    //on attack button click//
    $("#attack").on("click", function () {
        if ($("#currentOpponent").is(":empty")) {
            $("#gameInfo2").text("Pick an opponent");
            return setTimeout(function () {
                $("#gameInfo2").text("")
            }, 2000);

        } else {
            villain.hP = villain.hP - hero.attack;
            hero.hP = hero.hP - villain.counterAttack;
            $("#gameInfo2").text("You attacked " + villain.name + " for " + hero.attack + ". " + villain.name + " counter-attacked for " + villain.counterAttack);
            hero.attack = hero.attack + hero.increase;
            assignStats();
            if (hero.hP < 1) {
                $("#restart").css({
                    display: "block"
                });
                $("#gameInfo2").text("You lose!");
            } else if (villain.hP < 1) {
                defeated.push(villain);
                isGameWon();
            }
        }
    });

    //restart game on button click
    $("#restart").on("click", function () {
        location.reload();
    });

    //new round//
    function newRound() {
        assignVillain();
    }

    //is Game won//
    function isGameWon() {
        if (defeated.length > 2) {
            $("#gameInfo2").text("You won the whole game!");
            $("#restart").css({
                display: "block"
            });
            return
        } else {
            $("#gameInfo2").text("You won the round! Select a new opponent.");
            setTimeout(function () {
                $("#gameInfo2").text("")
            }, 2000);
            $("#currentOpponent div").remove();
            console.log(defeated.length);
            newRound();
        }
    }





















































































});