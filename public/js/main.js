function delete_product(id) {
    addEventListener('click', _ => {
        fetch('/toys', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById(`product-name-${id}`).innerText
            })
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                window.location.reload()
            })
    })
}


