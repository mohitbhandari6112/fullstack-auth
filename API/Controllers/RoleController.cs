using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public RoleController(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;

        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto role)
        {

            if (string.IsNullOrEmpty(role.RoleName))
            {
                return BadRequest("Role cannot be empty");
            }

            var roleExist = await _roleManager.RoleExistsAsync(role.RoleName);

            if (roleExist)
            {
                return BadRequest("Role already exists");
            }

            var newRole = await _roleManager.CreateAsync(new IdentityRole(role.RoleName));
            if (newRole.Succeeded)
            {
                return Ok(new { message = "Role created successfully" });
            }
            return BadRequest("Role Creation Failed");

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleResponseDto>>> GetAllRoles()
        {
            var roles = await _roleManager.Roles.Select(r => new RoleResponseDto
            {
                RoleName = r.Name,
                RoleId = r.Id,
                TotalUsers = _userManager.GetUsersInRoleAsync(r.Name).Result.Count
            }).ToListAsync();

            return Ok(roles);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRole(string id)
        {
            //find role by the id
            var Role = await _roleManager.FindByIdAsync(id);

            if (Role is null)
            {
                return NotFound("Role Not Found");
            }
            var result = await _roleManager.DeleteAsync(Role);

            if (result.Succeeded)
            {
                return Ok(new { message = "Role deleted successfully" });
            }
            return BadRequest("Role deletion failed");
        }

    }
}