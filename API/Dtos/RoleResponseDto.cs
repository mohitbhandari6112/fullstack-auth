using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RoleResponseDto
    {
        public string? RoleId { get; set; }
        public string? RoleName { get; set; }
        public int TotalUsers { get; set; }

    }
}