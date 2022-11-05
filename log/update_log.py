import os
import datetime

# Get directory
dir = os.path.dirname(os.path.realpath(__file__))

log_dir = os.path.join(dir, 'log.txt')
# Get datetime
dt = datetime.datetime.now()

new_log_txt = "The last scheduled commit was on:\n{}".format(dt)

with open(log_dir, 'w') as f:
    f.write(new_log_txt)
