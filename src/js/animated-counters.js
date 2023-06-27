function initializeCounters() {
    const counterElements = document.querySelectorAll(".counter-value");

    if (counterElements.length) {
        counterElements.forEach(function(element) {
            const data = {
                element,
                ...element.dataset
            }

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounter(data);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(element);
        });
    }
}

function animateCounter({element, startValue, endValue, speed, decimal, suffix}) {
    let currentValue = parseFloat(startValue);
    const range = parseFloat(endValue) - currentValue;
    const step = range / (speed / 10);
    const increment = currentValue < parseFloat(endValue) ? step : -step;

    const timer = setInterval(function() {
        currentValue += increment;
        element.textContent = formatNumber(currentValue, decimal, suffix);

        if (
            (increment > 0 && currentValue >= parseFloat(endValue)) ||
            (increment < 0 && currentValue <= parseFloat(endValue))
        ) {
            element.textContent = formatNumber(endValue,  decimal, suffix);
            clearInterval(timer);
        }
    }, 10);
}

function formatNumber(number, decimal, suffix) {
    return `${number.toLocaleString(
        undefined,
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimal,
            useGrouping: false,
        })}${suffix || ""}`;
}
