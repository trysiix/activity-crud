import React, { useState , useEffect } from 'react';
import { FiFilePlus, FiEdit, FiDelete } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { HandleDelete } from '../../controllers/handlers';
import { PriorityOptions, TypeOptions } from '../../utils/constants';

import '../../global.css';
import './styles.css';
import Api from '../../services/api';

export default function StorePage() {
    const [activitys, setActivitys] = useState([]);

    useEffect(() => {
        Api.get('/index', {
        }).then(res => {
            setActivitys(res.data);
        })
    }, []);

    function callDelete(id) {
        const deleteCall = HandleDelete({ id:id });
        
        deleteCall.then(setActivitys(activitys.filter(activitys => activitys.activity_id !== id)))
    }

    return(
        <div className="page-container">
            <h1>Atividades</h1>
            <div className="header">
                <Link id="custom-btn" to="/Register">
                    <FiFilePlus size={25} color="#fff"/>
                    <span>Cadastrar</span>
                </Link>
            </div>
            
            <div className="catalog">
                <ul>
                    {
                        activitys.map(data => (
                            <li key={data.activity_id}>
                                <div className="catalog-content">
                                    <span className="sp-grey">Nome:</span> 
                                        <strong>{data.name}</strong>
                                        <br/>
                                    <span className="sp-grey">Tipo:</span>
                                        <strong>{TypeOptions[data.type]}</strong>
                                        <br/>
                                    <span className="sp-grey">Prioridade:</span>
                                        <strong>{PriorityOptions[data.priority]}</strong>
                                        <br/>
                                    <span className="sp-grey">Descrição:</span> 
                                        <strong>{data.description}</strong>
                                        <br/>
                                    <span className="sp-grey">Data de realização:</span> 
                                        <strong>{data.date}</strong>
                                </div>
                               
                                <div className="crud-btn">
                                    <Link id="custom-btn" to={`/Edit?id=${data.activity_id}&name=${data.name}&type=${data.type}&priority=${data.priority}&description=${data.description}&date=${data.date}`}>
                                        <FiEdit size={19} color="#fff"/>
                                        <span> Editar</span>
                                    </Link>
                                    
                                    <button id="custom-btn" type="button" onClick={() => callDelete(data.activity_id)}>
                                        <FiDelete size={19} color="#fff"/>
                                        <span> Deletar</span>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div> 
        </div>
    );
}

