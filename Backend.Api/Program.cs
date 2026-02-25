using Backend.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "https://melissa-bresler.github.io"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

AppDomain.CurrentDomain.UnhandledException += (s, e) =>
{
    Console.WriteLine($"Unhandled exception: {e.ExceptionObject}");
};
TaskScheduler.UnobservedTaskException += (s, e) =>
{
    Console.WriteLine($"Unobserved task exception: {e.Exception}");
    e.SetObserved();
};

// Middleware
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("frontend");

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

Console.WriteLine("Starting app...");
app.Run();
