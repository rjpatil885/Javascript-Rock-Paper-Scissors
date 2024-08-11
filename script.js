$(document).ready(function () {
    let player1Score = 0;
    let player2Score = 0;

    $(".option-icon").click(function () {
        const player1Option = $(this).data("option");
        $("#player1-selection").text(`Player 1 selected: ${player1Option}`).show();

        resetOptions();
        $(this).css({ opacity: 1, color: "#28a745" });

        $("#loader").show();
        $("#ai-message").hide();

        setTimeout(function () {
            const player2Option = getAIOption();
            $("#loader").hide();
            $("#player2-selection").text(`Player 2 (AI) selected: ${player2Option}`).show();

            highlightAIOption(player2Option);

            const result = determineResult(player1Option, player2Option);
            displayResult(result, player1Option, player2Option);

            updateScores();

            setTimeout(resetGame, 3000);
        }, 1500);
    });

    function getAIOption() {
        const options = ['rock', 'paper', 'scissors'];
        return options[Math.floor(Math.random() * options.length)];
    }

    function highlightAIOption(option) {
        $(`.ai-option[data-option="${option}"]`).css({ color: "#dc3545" });
    }

    function determineResult(player1Option, player2Option) {
        if (player1Option === player2Option) {
            return "tie";
        } else if (
            (player1Option === 'rock' && player2Option === 'scissors') ||
            (player1Option === 'scissors' && player2Option === 'paper') ||
            (player1Option === 'paper' && player2Option === 'rock')
        ) {
            return "player1";
        } else {
            return "player2";
        }
    }

    function displayResult(result, player1Option, player2Option) {
        const resultElement = $("#result");

        switch(result) {
            case "tie":
                resultElement.text("It's a tie!").css({ color: "#ffc107" });
                highlightTie(player1Option, player2Option);
                break;
            case "player1":
                resultElement.text('Player 1 wins!').css({ color: "#28a745" });
                player1Score++;
                highlightWin(player1Option);
                break;
            case "player2":
                resultElement.text('Player 2 (AI) wins!').css({ color: "#dc3545" });
                player2Score++;
                highlightAIOption(player2Option);
                break;
        }
    }

    function updateScores() {
        $("#player1-score").text(player1Score);
        $("#player2-score").text(player2Score);
    }

    function highlightTie(player1Option, player2Option) {
        $(`.option-icon[data-option="${player1Option}"]`).css({ color: "#007bff" });
        $(`.ai-option[data-option="${player2Option}"]`).css({ color: "#007bff" });
    }

    function highlightWin(option) {
        $(`.option-icon[data-option="${option}"]`).css({ color: "#28a745" });
    }

    function resetGame() {
        $(".selection").hide();
        $("#result").text("").css({ color: "" });
        resetOptions();
    }

    function resetOptions() {
        $(".option-icon, .ai-option").css({ opacity: 1, color: "#000" });
    }
});
