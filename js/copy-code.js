// Enhances every code block in a blog post: wraps it in a framed container with
// a header bar (optional language label from <pre data-lang="...">) and a copy
// button. Self-contained, no dependencies, safe on pages without code blocks.
// If this script never runs, the plain dark <pre> is a perfectly good fallback.
(function () {
  "use strict";

  var ICON_COPY = "<i class='far fa-copy' aria-hidden='true'></i>";
  var ICON_DONE = "<i class='fas fa-check' aria-hidden='true'></i>";

  function setState(btn, icon, label) {
    btn.innerHTML = icon + "<span>" + label + "</span>";
  }

  function fallbackCopy(text, onDone) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    onDone(ok);
  }

  function buildButton(code) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.setAttribute("aria-label", "Copy code to clipboard");
    setState(btn, ICON_COPY, "Copy");

    var resetTimer = null;

    btn.addEventListener("click", function () {
      var text = code.innerText;
      var done = function (ok) {
        if (ok) {
          setState(btn, ICON_DONE, "Copied");
          btn.classList.add("copied");
          btn.setAttribute("aria-label", "Code copied to clipboard");
        } else {
          setState(btn, ICON_COPY, "Press Ctrl+C");
        }
        if (resetTimer) {
          window.clearTimeout(resetTimer);
        }
        resetTimer = window.setTimeout(function () {
          setState(btn, ICON_COPY, "Copy");
          btn.classList.remove("copied");
          btn.setAttribute("aria-label", "Copy code to clipboard");
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done(true); },
          function () { fallbackCopy(text, done); }
        );
      } else {
        fallbackCopy(text, done);
      }
    });

    return btn;
  }

  function enhance(pre) {
    var code = pre.querySelector("code");
    if (!code || pre.parentNode.classList.contains("code-block")) {
      return;
    }

    var wrap = document.createElement("div");
    wrap.className = "code-block";

    var bar = document.createElement("div");
    bar.className = "code-block__bar";

    // Left slot: language label if the author set one, else an empty spacer so
    // the button stays right-aligned under space-between.
    var lang = pre.getAttribute("data-lang");
    var left = document.createElement("span");
    if (lang) {
      left.className = "code-block__lang";
      left.textContent = lang;
    }
    bar.appendChild(left);
    bar.appendChild(buildButton(code));

    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(bar);
    wrap.appendChild(pre);
  }

  function init() {
    var blocks = document.querySelectorAll(".blog-body pre");
    for (var i = 0; i < blocks.length; i++) {
      enhance(blocks[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
