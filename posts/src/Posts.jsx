import { useEffect, useState } from "react";
import Comentarios from "./Comentarios";

function Posts() {

    // Estado para almacenar los posts
    const [posts, setPosts] = useState([]);

    // Estado para almacenar los usuarios
    const [users, setUsers] = useState([]);

    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true);

    // useEffect para cargar los posts una vez que el componente se monta
    useEffect(() => {
        async function fetchPosts() {

            // Hacemos la petición a la API para obtener los posts
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');

            // Convertimos la respuesta a JSON
            const postList = await res.json();

            // Actualizamos el estado de los posts con la respuesta de la API
            setPosts(postList);

            // Establecemos que ya no estamos cargando los datos
            setLoading(false);
        }

        fetchPosts();  // Ejecutamos la función para obtener los posts
    }, []);

    // useEffect para cargar los usuarios una vez que el componente se monta
    useEffect(() => {

        // Creamos la función asíncrona para obtener los usuarios
        async function fetchUsers() {

            // Hacemos la petición a la API para obtener los usuarios
            const res = await fetch('https://jsonplaceholder.typicode.com/users');

            // Convertimos la respuesta a JSON
            const userList = await res.json();

            // Actualizamos el estado de los usuarios con la respuesta de la API
            setUsers(userList);
        }

        fetchUsers();  // Ejecutamos la función para obtener los usuarios
    }, []);

    return (
        <div className="post-list">

            {/* Recorremos cada post y mostramos su título, contenido y el nombre del usuario */}
            {posts.map(post => {

                // Buscamos el usuario correspondiente a este post según el userId
                const user = users.find(user => user.id === post.userId);
                
                return (
                    <div className="post" key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        
                        {/* Si encontramos un usuario correspondiente, mostramos su nombre */}
                        {user && <p><strong>Posted by:</strong> {user.name}</p>}
                    </div>
                );
            })}

            {/* Importamos y mostramos los comentarios debajo de los posts */}
            <Comentarios />
        </div>
    );
}

export default Posts;