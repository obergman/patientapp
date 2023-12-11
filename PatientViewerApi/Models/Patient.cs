using Microsoft.EntityFrameworkCore;

namespace PatientViewerApi.Models
{



    [Index(nameof(Id), IsUnique = true)]
    public class Patient
    {
       
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }

        public string? Gender { get; set; }

        public Patient()
        {
            FirstName = "";
            LastName = "";          
        }





    }
}
