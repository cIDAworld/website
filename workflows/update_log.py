import os
import datetime

# Get directory
dir = os.path.dirname(os.path.realpath(__file__))

log_dir = os.path.join(dir, 'log.txt')
# Get datetime
dt = datetime.datetime.now()

# Open log
with open(log_dir) as f:
    log_txt = f.read()


new_log_txt = "- {}\n{}".format(dt, log_txt)

with open(log_dir, 'w') as f:
    f.write(new_log_txt)
