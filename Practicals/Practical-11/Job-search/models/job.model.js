module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define("Job", {
      title: { type: DataTypes.STRING, allowNull: false },
      company: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING },
      salary: { type: DataTypes.INTEGER },
      type: { type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Internship') },
      description: { type: DataTypes.TEXT }
    });
  
    return Job;
  };
  