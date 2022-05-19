const SUPABASE_URL = 'https://pkhqeamibgddnonpbkxj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraHFlYW1pYmdkZG5vbnBia3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTg0OTAsImV4cCI6MTk2Nzg3NDQ5MH0.1eWFqsiEyUcJk0zKbtjDhgy3edUHWCLvimGYjE0WG-M';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function fetchList() {
    const response = await client.from('shopping_list').select('*').order('created_at');

    if (response.data) {
        return response.data;
    }
}

export async function togglePurchased(item) {
    const response = await client.from('shopping_list').update({ purchased: !item.purchased }).match({ id: item.id });
    if (response.data) {
        return response.data;
    }
}

export async function createNewItem(item, qty) {
    const response = await client.from('shopping_list').insert({ item, qty });

    if (response.data) {
        return response.data;
    }
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('/');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./list');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '/');
}

export async function deleteList(user) {
    const response = await client.from('shopping_list').delete().match({ user_id: user.user_id });

    if (response.data) {
        return response.data;
    } else console.log(response.error.message);
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
