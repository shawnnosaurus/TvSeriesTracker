﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Helpers;

#nullable disable

namespace WebApi.Migrations
{
    [DbContext(typeof(SqliteDataContext))]
    [Migration("20230830050318_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.1");

            modelBuilder.Entity("WebApi.Entities.Episode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("EpisodeNumber")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Season")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SeriesId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SeriesId");

                    b.ToTable("Episodes");
                });

            modelBuilder.Entity("WebApi.Entities.Series", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Series");
                });

            modelBuilder.Entity("WebApi.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.Entities.WatchedEpisode", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<int>("EpisodeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "EpisodeId");

                    b.HasIndex("EpisodeId");

                    b.ToTable("UsersWatchedEpisodes");
                });

            modelBuilder.Entity("WebApi.Entities.Episode", b =>
                {
                    b.HasOne("WebApi.Entities.Series", "Series")
                        .WithMany("Episodes")
                        .HasForeignKey("SeriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Series");
                });

            modelBuilder.Entity("WebApi.Entities.WatchedEpisode", b =>
                {
                    b.HasOne("WebApi.Entities.Episode", "Episode")
                        .WithMany("UsersWatched")
                        .HasForeignKey("EpisodeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Entities.User", "User")
                        .WithMany("EpisodesWatched")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Episode");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApi.Entities.Episode", b =>
                {
                    b.Navigation("UsersWatched");
                });

            modelBuilder.Entity("WebApi.Entities.Series", b =>
                {
                    b.Navigation("Episodes");
                });

            modelBuilder.Entity("WebApi.Entities.User", b =>
                {
                    b.Navigation("EpisodesWatched");
                });
#pragma warning restore 612, 618
        }
    }
}