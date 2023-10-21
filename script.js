document.addEventListener("DOMContentLoaded", () => {
    const apiForm = document.getElementById("api-form");
    const apiDataContainer = document.getElementById("api-data");

    apiForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const host = document.getElementById("host").value;
        const apiUrl = `https://chisato.alicey.dev/api/v1/servers/status?host=${host}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("データの取得に失敗しました。");
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                const { name, max_players, online_players, players } = data;
                let playersList = null
                if (players != null) {
                    playersList = players.map(player => `<li>${player.name}</li>`).join("");
                }

                apiDataContainer.innerHTML = `
                    <ul>
                        <li>Endpoint: ${host}</li>
                        <li>ServerName: ${name}</li>
                        <li>MaxPlayer: ${max_players}</li>
                        <li>OnlinePlayer: ${online_players}</li>
                        <li>Players:</li>
                        <ul>${playersList}</ul>
                    </ul>
                `;
            })
            .catch(error => {
                console.error("エラーが発生しました:", error);
                apiDataContainer.innerHTML = "Server is not found"; // エラー時にデータをクリア
            });
    });
});