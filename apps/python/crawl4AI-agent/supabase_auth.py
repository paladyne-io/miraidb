import os
from dotenv import load_dotenv
from supabase import create_client, Client

def authenticate_supabase() -> Client:
    load_dotenv()
    
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
    SUPABASE_EMAIL = os.getenv("SUPABASE_EMAIL")
    SUPABASE_PASSWORD = os.getenv("SUPABASE_PASSWORD")

    # Create Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

    # Authenticate user
    user = supabase.auth.sign_in_with_password({
        "email": SUPABASE_EMAIL,
        "password": SUPABASE_PASSWORD
    })
    
    return supabase
