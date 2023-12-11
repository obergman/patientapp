using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientViewerApi.Models;

namespace PatientViewerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly PatientContext _context;

        public PatientsController(PatientContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("upload")]
        public Task<IActionResult> Upload()
        {
            var files = Request.Form.Files;
            var file = files[0];
            var fileExtension = Path.GetExtension(file.FileName);
            //var newFilename = fileGuid + fileExtension;
            //if (isUploaded)
            if (file.Length > 0)
            {
                using (Stream stream = file.OpenReadStream())
                {
                    try
                    { 
                        stream.Seek(0, SeekOrigin.Begin);
                        var sr = new StreamReader(stream);

                        var arr = new List<Patient>();
                        
                        var header = sr.ReadLine();

                        while (!sr.EndOfStream)
                        {
                            var line = sr.ReadLine();

                            var items = line.Split(',');

                            var p = new Patient();

                            p.FirstName = items[0];
                            p.LastName = items[1];
                            p.Dob = DateTime.Parse(items[2]);
                            p.Gender = items[3];

                            arr.Add(p);

                            Console.WriteLine(line);
                        }
                        sr.Close();

                        // commit
                        _context.Patients.AddRange(arr);
                        _context.SaveChanges();

                    }
                    catch (Exception e)
                    {
                        //Log.Logger.Error(e, "Image processing error");

                    }
                    finally
                    {
                        stream.Close();
                        
                    }

                }
            }

            return Task.FromResult<IActionResult>(Ok());

        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
          if (_context.Patients == null)
          {
              return NotFound();
          }
            return await _context.Patients.ToListAsync();
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
          if (_context.Patients == null)
          {
              return NotFound();
          }
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.Id)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
          if (_context.Patients == null)
          {
              return Problem("Entity set 'PatientContext.Patients'  is null.");
          }
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            if (_context.Patients == null)
            {
                return NotFound();
            }
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return (_context.Patients?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
