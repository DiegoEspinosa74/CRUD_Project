export default function NavBar({ onOpen, onSearch}){

    const handleSearchChange = (event) => {
      onSearch(event.target.value);
    }
  
      return (
          <>
          <div class="navbar bg-base-100 p-4">
    <div class="navbar-start">
     
      <a class="btn btn-ghost text-xl">Clientsl</a>
    </div>
    <div class="navbar-center">
      <div class="form-control">
          <input type="text" placeholder="Search" onChange={handleSearchChange} className="input input-bordered w-48 md:w-auto" />
      </div>
    </div>
    <div class="navbar-end">
      <a class="btn btn-primary" onClick={onOpen}>Add Client</a>
    </div>
  </div>
          </>
      )
  }
  