using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMentorshipAndSessionModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MentorshipRequests_Users_UsersId",
                table: "MentorshipRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Users_UsersId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_MentorshipRequests_UsersId",
                table: "MentorshipRequests");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "MentorshipRequests");

            migrationBuilder.AlterColumn<int>(
                name: "UsersId",
                table: "Sessions",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_MentorshipRequests_MenteeId",
                table: "MentorshipRequests",
                column: "MenteeId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorshipRequests_MentorId",
                table: "MentorshipRequests",
                column: "MentorId");

            migrationBuilder.AddForeignKey(
                name: "FK_MentorshipRequests_Users_MenteeId",
                table: "MentorshipRequests",
                column: "MenteeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MentorshipRequests_Users_MentorId",
                table: "MentorshipRequests",
                column: "MentorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Users_UsersId",
                table: "Sessions",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MentorshipRequests_Users_MenteeId",
                table: "MentorshipRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_MentorshipRequests_Users_MentorId",
                table: "MentorshipRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Users_UsersId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_MentorshipRequests_MenteeId",
                table: "MentorshipRequests");

            migrationBuilder.DropIndex(
                name: "IX_MentorshipRequests_MentorId",
                table: "MentorshipRequests");

            migrationBuilder.AlterColumn<int>(
                name: "UsersId",
                table: "Sessions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "MentorshipRequests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MentorshipRequests_UsersId",
                table: "MentorshipRequests",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_MentorshipRequests_Users_UsersId",
                table: "MentorshipRequests",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Users_UsersId",
                table: "Sessions",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
