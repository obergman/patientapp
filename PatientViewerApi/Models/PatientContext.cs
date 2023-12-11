
using Microsoft.EntityFrameworkCore;

namespace PatientViewerApi.Models
{
    public partial class PatientContext : DbContext
    {
        public DbSet<Patient> Patients { get; set; }

        public string DbPath { get; private set; }

        public PatientContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = $"{path}{System.IO.Path.DirectorySeparatorChar}patient.db";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
        
    }

}
