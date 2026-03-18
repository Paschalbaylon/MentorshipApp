using System;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.AppDbContext;

public class SiteDbContext : DbContext
{
    public SiteDbContext(DbContextOptions<SiteDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<MenteeProfile> MenteeProfiles { get; set; }
    public DbSet<MentorProfile> MentorProfiles { get; set; }
    public DbSet<MentorshipRequest> MentorshipRequests { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ✅ Configure MentorProfile <-> User one-to-one
        modelBuilder.Entity<MentorProfile>()
            .HasOne(m => m.Users)
            .WithOne(u => u.MentorProfile)
            .HasForeignKey<MentorProfile>(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // ✅ Configure MenteeProfile <-> User one-to-one
        modelBuilder.Entity<MenteeProfile>()
            .HasOne(m => m.User)
            .WithOne(u => u.MenteeProfile)
            .HasForeignKey<MenteeProfile>(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // ✅ Configure RefreshToken <-> User one-to-many
        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // ✅ Index on Token for fast lookups
        modelBuilder.Entity<RefreshToken>()
            .HasIndex(rt => rt.Token)
            .IsUnique();
    }


}
