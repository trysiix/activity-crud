import Api from '../services/api';


export function HandleUrlParams(url){
    const treatedUrl = url.replace(/%20/, ' ').split(`?`)[1].split(`&`);

     const data = {
        'id':treatedUrl[0].split('=')[1],
        'name':treatedUrl[1].split('=')[1],
        'type':treatedUrl[2].split('=')[1],
        'priority':treatedUrl[3].split('=')[1],
        'description':treatedUrl[4].split('=')[1],
        'date':treatedUrl[5].split('=')[1],
    }

    return data;
}

export async function HandleSubmit ({ name, type, priority, description, date, history }){
    const data = {
        name,
        type,
        priority,
        description,
        date,
    }

    try {
        await Api.post('/create', data)
        history.push('/');
    } catch (error) {
        alert('Erro ao cadastrar atividade, tente novamente.');
    } 
}

export async function HandleEdit ({ name, type, priority, description, date, history, id }) {
    const data = {
        name,
        type,
        priority,
        description,
        date,
    }

    try {
        await Api.put(`/edit/${id}`, data)
        history.push('/');
    } catch (error) {
        alert('Erro ao editar atividade, tente novamente.');
    } 
}

export async function HandleDelete({ id }) {
    try {
        await Api.delete(`delete/${id}`);
    } catch (error) {
        alert('Erro ao deletar atividade, tente novamente.');
    }
}

export function HandlePrioritysOptions({ type, PriorityOptions }) {
    if(Number(type) === 1){
        let options = Object.entries(PriorityOptions);
        return [options[0]];
    }

    return Object.entries(PriorityOptions);
}
