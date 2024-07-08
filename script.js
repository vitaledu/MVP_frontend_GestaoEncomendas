const API_BASE_URL = 'http://localhost:5000'; // URL da encomendas_api

$(document).ready(function() {
    // Cadastrar Encomenda
    $('#encomendaForm').on('submit', function(e) {
        e.preventDefault();

        const encomendaData = {
            codigo_rastreamento: $('#codigoRastreamento').val(),
            descricao: $('#descricao').val(),
            endereco_origem: $('#enderecoOrigem').val(),
            endereco_destino: $('#enderecoDestino').val()
        };

        $.ajax({
            url: `${API_BASE_URL}/encomendas`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(encomendaData),
            success: function(response) {
                alert('Encomenda cadastrada com sucesso!');
                $('#encomendaForm')[0].reset();
            },
            error: function(xhr) {
                const errorResponse = xhr.responseJSON || {error: 'Erro desconhecido'};
                alert('Erro ao cadastrar encomenda: ' + errorResponse.error);
            }
        });
    });

    // Marcar Encomenda como Entregue
    $('#marcarEntregue').on('click', function() {
        const encomendaId = $(this).data('id');

        $.ajax({
            url: `${API_BASE_URL}/encomendas/${encomendaId}/entregar`,
            type: 'PUT',
            success: function(response) {
                alert('Encomenda marcada como entregue!');
                $('#consultaResultado').find('p:contains("Status")').html(`<strong>Status:</strong> ${response.status}`);
                $('#marcarEntregue').hide();
                $('#marcarEmTransito').show();
            },
            error: function(xhr) {
                const errorResponse = xhr.responseJSON || {error: 'Erro desconhecido'};
                alert('Erro ao marcar encomenda como entregue: ' + errorResponse.error);
            }
        });
    });

    // Marcar Encomenda como Em Trânsito
    $('#marcarEmTransito').on('click', function() {
        const encomendaId = $(this).data('id');

        $.ajax({
            url: `${API_BASE_URL}/encomendas/${encomendaId}/em_transito`,
            type: 'PUT',
            success: function(response) {
                alert('Encomenda marcada como em trânsito!');
                $('#consultaResultado').find('p:contains("Status")').html(`<strong>Status:</strong> ${response.status}`);
                $('#marcarEntregue').show();
                $('#marcarEmTransito').hide();
            },
            error: function(xhr) {
                const errorResponse = xhr.responseJSON || {error: 'Erro desconhecido'};
                alert('Erro ao marcar encomenda como em trânsito: ' + errorResponse.error);
            }
        });
    });

    // Deletar Encomenda
    $('#deletarEncomenda').on('click', function() {
        const encomendaId = $(this).data('id');

        $.ajax({
            url: `${API_BASE_URL}/encomendas/${encomendaId}`,
            type: 'DELETE',
            success: function(response) {
                alert('Encomenda deletada com sucesso!');
                $('#consultaResultado').html('');
                $('#marcarEntregue').hide();
                $('#marcarEmTransito').hide();
                $('#deletarEncomenda').hide();
            },
            error: function(xhr) {
                const errorResponse = xhr.responseJSON || {error: 'Erro desconhecido'};
                alert('Erro ao deletar encomenda: ' + errorResponse.error);
            }
        });
    });

    // Consultar Encomenda
    $('#consultaForm').on('submit', function(e) {
        e.preventDefault();
        const encomendaId = $('#consultaId').val();

        $.ajax({
            url: `${API_BASE_URL}/encomendas/${encomendaId}`,
            type: 'GET',
            success: function(response) {
                $('#consultaResultado').html(`
                    <p><strong>Código de Rastreamento:</strong> ${response.codigo_rastreamento}</p>
                    <p><strong>Descrição:</strong> ${response.descricao}</p>
                    <p><strong>Endereço de Origem:</strong> ${response.endereco_origem}</p>
                    <p><strong>Endereço de Destino:</strong> ${response.endereco_destino}</p>
                    <p><strong>Status:</strong> ${response.status}</p>
                `);
                $('#marcarEntregue').data('id', encomendaId).toggle(response.status !== 'Entregue');
                $('#marcarEmTransito').data('id', encomendaId).toggle(response.status === 'Entregue');
                $('#deletarEncomenda').data('id', encomendaId).show();
            },
            error: function(xhr) {
                const errorResponse = xhr.responseJSON || {error: 'Erro desconhecido'};
                $('#consultaResultado').html('<p class="text-danger">Erro: ' + errorResponse.error + '</p>');
                $('#marcarEntregue').hide();
                $('#marcarEmTransito').hide();
                $('#deletarEncomenda').hide();
            }
        });
    });

    // Calcular Distância
    $('#distanciaForm').on('submit', function(e) {
        e.preventDefault();

        const origem = $('#origemDistancia').val();
        const destino = $('#destinoDistancia').val();

        $.ajax({
            url: `${API_BASE_URL}/distancia?origem=${origem}&destino=${destino}`,
            type: 'GET',
            success: function(response) {
                $('#distanciaResultado').html(`
                    <p><strong>Origem:</strong> ${response.origem}</p>
                    <p><strong>Destino:</strong> ${response.destino}</p>
                    <p><strong>Distância:</strong> ${response.distancia} km</p>
                `);
            },
            error: function(xhr) {
                const errorResponse = xhr.responseJSON || {error: 'Erro desconhecido'};
                $('#distanciaResultado').html('<p class="text-danger">Erro ao calcular distância: ' + errorResponse.error + '</p>');
            }
        });
    });
});
