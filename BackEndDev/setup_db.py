import pandas as pd 
import sqlite3 
import os 
import glob
import kagglehub

def setup_database():
    #Downloads datat. If the data is already downloaded, it goes to the local path.
    path = kagglehub.dataset_download("arashnic/book-recommendation-dataset")
    print("Path to dataset files:", path)

    # Look inside that downloaded folder and find all the CSV files
    csv_files = glob.glob(os.path.join(path, "*.csv"))
    
    if not csv_files:
        print("\n[ERROR] No CSV files found in the dataset.")
        return
        
    # Create the SQLite database file in project_database.db folder
    db_path = 'project_database.db'
    conn = sqlite3.connect(db_path)
    print(f"\nBuilding SQL database: {db_path}")
    
    for csv_file in csv_files:
        # Extract the file name (e.g., 'Books.csv' -> 'books')
        file_name = os.path.basename(csv_file)
        table_name = file_name.replace('.csv', '').lower()
        
        # Read the CSV. The 'latin-1' encoding helps prevent crashes from weird characters in the book data.
        df = pd.read_csv(csv_file, encoding='latin-1', on_bad_lines='skip', low_memory=False)
        
        # Clean column names for SQL database
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_').str.replace('-', '_')
        
        # Funnel the data into the SQLite table
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        print(f" -> Inserted {len(df)} rows.")

    conn.close()
    print("\n[SUCCESSFUL])")

if __name__ == "__main__":
    setup_database()