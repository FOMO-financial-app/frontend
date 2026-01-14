import glassicon from "../../../assets/img/glass-icon.svg"

export const SearchInput = ({ inputRef, value, onChange, onSubmitSearch, onKeyDown }) => {
    return (
        <form onSubmit={onSubmitSearch} className="search-input-container">
            <img src={glassicon} className="search-icon"/>
            <input 
                ref={inputRef}
                type="search"
                className="search-input"
                placeholder="Buscar"
                name="q"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck="false"
            />
        </form>
    );
}