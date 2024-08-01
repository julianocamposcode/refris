// const apiUrl = 'https://refris-back.vercel.app';

let lavagens = 13;

async function fetchLavagens() {
    const response = await fetch(`${apiUrl}/lavagens`);
    return response.json();
}

async function updateLavagem(id, status) {
    await fetch(`${apiUrl}/lavagens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
    });
}

async function initialize() {
    const ol = document.querySelector('.ol');
    const dias = document.querySelector('.dias');
    const lavagensData = await fetchLavagens();
    let checkedIds = lavagensData.filter(l => l.status).map(l => l.id);

    dias.innerHTML = lavagens - checkedIds.length;

    for (let i = 0; i < lavagens; i++) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        label.setAttribute('for', 'checkbox1')
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox1';
        checkbox.dataset.id = i + 1;
        li.textContent = 'dia ';
        li.appendChild(label);
        li.appendChild(checkbox);
        ol.appendChild(li);

        if (checkedIds.includes(Number(checkbox.dataset.id))) {
            checkbox.checked = true;
        }

        checkbox.checked
        console.log()

        checkbox.addEventListener('change', async () => {
            let id = Number(checkbox.dataset.id);
            if (checkbox.checked) {
                await updateLavagem(id, true);
            } else {
                await updateLavagem(id, false);
            }
            dias.innerHTML = lavagens - (await fetchLavagens()).filter(l => l.status).length;
        });
    }
}

initialize();