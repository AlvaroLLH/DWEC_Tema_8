import { useEffect, useState } from "react";

function Comentarios({ postId }) {
    
    // Estado para almacenar los comentarios
    const [comentarios, setComentarios] = useState([]);
    
    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true);

    // useEffect para cargar los comentarios del post específico una vez que el componente se monta
    useEffect(() => {
        async function fetchComentarios() {

            // Hacemos la petición a la API para obtener los comentarios de un post específico
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            
            // Convertimos la respuesta a JSON
            const comentariosList = await res.json();
            
            // Actualizamos el estado de los comentarios con la respuesta de la API
            setComentarios(comentariosList);
            
            // Establecemos que ya no estamos cargando los datos
            setLoading(false);
        }

        fetchComentarios(); // Ejecutamos la función para obtener los comentarios
    }, [postId]);

    return (
        <div className="comentarios-list">
            {loading ? (
                <p>Cargando comentarios...</p>
            ) : (
                comentarios.map(comentario => (
                    <div className="comentario" key={comentario.id}>
                        <h3>{comentario.name}</h3>
                        <p>{comentario.body}</p>
                        <p><strong>Email:</strong> {comentario.email}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Comentarios;