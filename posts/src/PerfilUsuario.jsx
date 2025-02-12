import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PerfilUsuario() {

    // Obtenemos el ID del usuario desde los parámetros de la URL
    const { id } = useParams();

    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState(null);

    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true);

    // useEffect para cargar la información del usuario al montar el componente
    useEffect(() => {
        async function fetchUsuario() {

            // Hacemos la petición a la API para obtener los datos del usuario
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

            // Convertimos la respuesta a JSON
            const userData = await res.json();

            // Actualizamos el estado con los datos del usuario
            setUsuario(userData);

            // Establecemos que ya no estamos cargando los datos
            setLoading(false);
        }

        fetchUsuario(); // Ejecutamos la función para obtener los datos del usuario
    }, [id]);

    return (
        <div className="perfil-usuario">
            {loading ? (
                <p>Cargando perfil...</p>
            ) : usuario ? (
                <div>
                    <h1>{usuario.name}</h1>
                    <p><strong>Username:</strong> {usuario.username} </p>
                    <p><strong>Email:</strong> {usuario.email} </p>
                    <p><strong>Teléfono:</strong> {usuario.phone} </p>
                    <p><strong>Sitio Web:</strong> {usuario.website} </p>
                    <p><strong>Compañía:</strong> {usuario.company.name} </p>
                </div>
            ) : (
                <p>Usuario no encontrado.</p>
            )}
        </div>
    );
}

export default PerfilUsuario;