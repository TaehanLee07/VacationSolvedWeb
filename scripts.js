function showPopup() {
    document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}

function addProblem() {
    var week = document.getElementById("week").value;
    var title = document.getElementById("title").value;
    var link = document.getElementById("link").value;
    var explanation = document.getElementById("explanation").value;
    var code = document.getElementById("code").value;
    var codeExplanation = document.getElementById("codeExplanation").value;

    var problemHTML = `
        <div class="problem">
            <h3>${title}</h3>
            <p>문제 링크: <a href="${link}" target="_blank">${link}</a></p>
            <div class="explanation">
                <h4>문제 해설</h4>
                <p>${explanation}</p>
            </div>
            <div class="code">
                <h4>코드</h4>
                <pre><code>${code}</code></pre>
            </div>
            <div class="explanation">
                <h4>코드 해설</h4>
                <p>${codeExplanation}</p>
            </div>
        </div>
    `;

    document.getElementById(week).insertAdjacentHTML('beforeend', problemHTML);
    hidePopup();
}

function deleteProblem() {
    var week1Problems = document.getElementById("week1").getElementsByClassName("problem");
    var week2Problems = document.getElementById("week2").getElementsByClassName("problem");

    if (week2Problems.length > 0) {
        week2Problems[week2Problems.length - 1].remove();
    } else if (week1Problems.length > 0) {
        week1Problems[week1Problems.length - 1].remove();
    } else {
        alert("삭제할 문제가 없습니다.");
    }
}
