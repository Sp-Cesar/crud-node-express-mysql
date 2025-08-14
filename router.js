const express = require('express');
const router = express.Router();
const conexion = require('./models/db');


router.get('/', (req, res) => {

    conexion.query('SELECT * FROM user',(error,result)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {resultado:result});
        }
    })

});
//RUTA PARA CREAR LOS REGRISTROS
router.get('/create', (req,res)=>{
    res.render('create');
})

//RUTA PARA EDITAR EL REGRISTRO
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM user WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]});
        }
    })
})

//RUTA PARA ELIMINAR EL REGISTRO
router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM user WHERE id = ?', [id],(error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })
})

const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router