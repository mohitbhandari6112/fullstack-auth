using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CreateRoleDto
    {
        [Required]
        public string RoleName  { get; set; }   
    }
}