import css from "./SearchBar.module.css"

export const SearchBar = ({onSubmit}) => {     
       
        return (
          <header className={css.SearchBar}>
            <form
              className={css.SearchForm}
              onSubmit={onSubmit}
            >
              <button
                type="submit"
                className={css.SearchFormButton}>
                <span className={css.SearchFormButtonLabel}>Search</span>
              </button>

              <input
                className={css.SearchFormInput}               
                name="inputKey"                
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        )
    
}

