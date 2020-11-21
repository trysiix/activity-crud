import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { PriorityOptions, TypeOptions, PriorityMap, TypeMap } from '../../utils/constants';
import { HandleUrlParams, HandleEdit, HandleSubmit, HandlePrioritysOptions } from '../../controllers/handlers';

import '../../global.css';
import './styles.css';

export default function NewActivity() {
    const url = window.location.href;
    const hasParams = url.indexOf('id') !== -1;
    
    const [params, setParams] = useState(hasParams ? HandleUrlParams(url) : '');
    const [name, setName] = useState(params.name || '');
    const [type, setType] = useState(params.type || TypeMap.manutencao);
    const [priority, setPriority] = useState(params.priority || PriorityMap.normal);
    const [description, setDescription] = useState(params.description || '');
    const date =  new Date().toLocaleString().split(',')[0];
    const history = useHistory();

    async function editForm (submitData) {
        submitData.preventDefault();
        HandleEdit({ name, type, priority, description, date, history, id:params.id })
    }
    async function submitForm (submitData) {
        submitData.preventDefault();
        HandleSubmit({ name, type, priority, description, date, history })
    }

    return(
        <div className="new-activity">
            <div className="content">
                <section>
                    <form>
                        <h1>Cadastrar Atividade</h1>
                        <p>Insira os dados da Atividade.</p>
                        <Link id="back-link" to="/">
                            <FiArrowLeft size={15} color="#E02041"/>
                            <span id="btn-label">Listar Atividades</span>
                        </Link>
                    </form>
                </section>
                <form onSubmit={hasParams? editForm:submitForm}>
                    <input 
                        placeholder="Nome" 
                        value={name}
                        onChange={submitData => setName(submitData.target.value)}
                        maxLength="25"
                        required
                    />
                    <select value={ type } onChange={submitData => setType(submitData.target.value)}>
                        {Object.entries(TypeOptions).map(option => (
                            <option value={option[0]}>{option[1]}</option>
                                ))
                            }
                    </select>
                    <select value={ priority } onChange={submitData => setPriority(submitData.target.value)}>
                        {HandlePrioritysOptions({ type:type, PriorityOptions:PriorityOptions }).map(option => (
                            <option value={option[0]}>{option[1]}</option>
                                ))
                            }
                    </select>
                    
                    <textarea 
                        placeholder="Descricao" 
                        value={description}
                        onChange={submitData => setDescription(submitData.target.value)}
                        maxLength="120"
                    />
                    <button id="custom-btn" type="submit">{hasParams? 'Editar' : 'Cadastrar' }</button>
                </form>
            </div>
        </div>
    );
}