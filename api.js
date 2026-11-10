const API_URL = 'http://localhost:3000/series'
export async function obterSeries(){
    try{
        const response = await fetch(API_URL)
        if(!response.ok){
            throw new response.json();
        }
        return await response.json()
    } catch(error){
        console(error);
        throw new error;
    }
}
export async function criarSerie(serie){
    try{
    const response = await fetch(API_URL, {method:'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(serie)
    })
    if(!response.ok){
            throw new response.json();
        }
        return await response.json()
    }
     catch(error){
        console(error);
        throw new error;
    }
}
export async function atualizarSerie(serie){
    try{
        const response = await fetch(`${API_URL}/${serie.id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(serie)
        })
        if(!response.ok){
            console.log('Erro ao atualizar produto')
            throw new response.json()
        }
        return await response.json()
    } catch(error){
        console.error(error)
        throw new error
    }
}
export async function deletarSerie(id){
    try{
        const response = await fetch(`${API_URL}/${id}`,{
            method: 'DELETE'
        })
        if(!response.ok){
            conseole.log('Erro ao buscar a serie')
            throw new response.json()
        }
        return await response.json()
    } catch(error){
        console.error(error)
        throw new error;
    }
}