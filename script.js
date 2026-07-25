document.documentElement.classList.add("has-js");

const revealItems = [
  ...document.querySelectorAll("main > section:not(.hero):not(.screen-gallery)"),
  ...document.querySelectorAll(".screen-story"),
];

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 55}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const testflightForm = document.querySelector("#testflight-form");

if (testflightForm) {
  const endpoint =
    "https://ebbuloiyjemmyhxazmxh.supabase.co/functions/v1/apply-testflight";
  const status = testflightForm.querySelector(".testflight-status");
  const submitButton = testflightForm.querySelector("button[type='submit']");
  const nameInput = testflightForm.querySelector("input[name='name']");
  const emailInput = testflightForm.querySelector("input[name='email']");
  const consentInput = testflightForm.querySelector("input[name='privacyConsent']");
  const decoyInput = testflightForm.querySelector("input[name='website']");
  let sending = false;

  const setStatus = (message, state) => {
    status.textContent = message;
    if (state) {
      status.dataset.state = state;
    } else {
      delete status.dataset.state;
    }
  };

  const markInvalid = (input) => {
    input.setAttribute("aria-invalid", "true");
    input.focus();
  };

  [nameInput, emailInput].forEach((input) => {
    input.addEventListener("input", () => input.removeAttribute("aria-invalid"));
  });

  testflightForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name) {
      setStatus("이름을 입력해 주세요. 가명도 괜찮아요.", "error");
      markInvalid(nameInput);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("초대장을 받을 이메일 주소를 확인해 주세요.", "error");
      markInvalid(emailInput);
      return;
    }
    if (!consentInput.checked) {
      setStatus("개인정보 수집 및 이용에 동의해 주세요.", "error");
      consentInput.focus();
      return;
    }

    sending = true;
    submitButton.disabled = true;
    setStatus("신청을 보내는 중이에요…");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          privacyConsent: true,
          website: decoyInput.value,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "신청을 보내지 못했어요.");
      }

      testflightForm.reset();
      // 커플 앱이라 상대 몫까지 신청하는 경우가 있어 폼을 닫지 않는다.
      setStatus(
        "신청이 접수됐어요. 준비되는 대로 이 이메일로 TestFlight 초대장을 보내드릴게요. 함께 쓸 상대가 있다면 그 사람도 신청해 주세요.",
        "done"
      );
      submitButton.disabled = false;
    } catch (error) {
      setStatus(
        error instanceof Error && error.message
          ? error.message
          : "신청을 보내지 못했어요. 잠시 후 다시 시도해 주세요.",
        "error"
      );
      submitButton.disabled = false;
    } finally {
      sending = false;
    }
  });
}

const canTilt =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canTilt) {
  document.querySelectorAll(".tilt-surface").forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const bounds = surface.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      surface.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
      surface.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
    });

    surface.addEventListener("pointerleave", () => {
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
    });
  });

  document.querySelectorAll(".hero-product").forEach((stage) => {
    const device = stage.querySelector(".device-hero");
    if (!device) return;

    stage.addEventListener("pointermove", (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      device.style.setProperty("--stage-x", `${(x * 13).toFixed(2)}px`);
      device.style.setProperty("--stage-y", `${(y * 9).toFixed(2)}px`);
    });

    stage.addEventListener("pointerleave", () => {
      device.style.setProperty("--stage-x", "0px");
      device.style.setProperty("--stage-y", "0px");
    });
  });
}
